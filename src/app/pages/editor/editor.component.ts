import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IconComponent } from '../../components/icon/icon.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { ArtboardWidgetImage } from '../../model/artboard-widget';
import { WidgetStore } from '../../stores/widget.store';

const BASE_IMAGE_HEIGHT = 300;
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, IconComponent, TooltipDirective, DragDropModule, ToolbarComponent],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  images = this.widgetStore.images;
  selectedWidget = this.widgetStore.selectedWidget;

  @ViewChild('artboard') artboard: ElementRef;

  constructor(private widgetStore: WidgetStore) {}

  onSelectFile(input: EventTarget | null) {
    if (input) {
      const file = (input as HTMLInputElement).files?.item(0);
      const reader = new FileReader();
      if (file) {
        reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
          if (typeof event.target?.result === "string") {
            const hostPosition = this.artboard.nativeElement.getBoundingClientRect();
            const image: ArtboardWidgetImage = {
              id: crypto.randomUUID(),
              src: event.target?.result,
              name: file.name,
              position: {
                x: hostPosition.width / 3,
                y: hostPosition.height / 3,
              },
              height: BASE_IMAGE_HEIGHT,
              rotation: 0,
            };
            this.images.update(images => [...images, image]);
          }
        });

        reader.readAsDataURL(file);
      }
    }
  }

  widgetById(_: number, widget: ArtboardWidgetImage) {
    return widget.id;
  }

  selectWidget(widget: ArtboardWidgetImage) {
    this.widgetStore.selectWidget(widget);
  }
}
