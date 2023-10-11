import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { IconComponent } from '../../components/icon/icon.component';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { ArtboardWidgetImage } from '../../model/artboard-widget';

const BASE_IMAGE_HEIGHT = 300;
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, IconComponent, TooltipDirective, DragDropModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  images: WritableSignal<ArtboardWidgetImage[]> = signal([]);
  selectedWidget: WritableSignal<ArtboardWidgetImage | null> = signal(null);

  @ViewChild('artboard') artboard: ElementRef;

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

  selectWidget(widget: ArtboardWidgetImage) {
    if (this.selectedWidget()?.id !== widget.id) {
      this.selectedWidget.set(widget);
    }
  }

  widgetById(_: number, widget: ArtboardWidgetImage) {
    return widget.id;
  }

  clearSelectedWidget() {
    this.selectedWidget.set(null);
  }

  deleteWidget() {
    this.images.update(widgets => widgets.filter(widget => widget.id !== this.selectedWidget()?.id));
  }

  rotateWidget(direction: 'forward' | 'backward') {
    const rotationModifier = 90 * (direction === 'forward' ? 1 : -1);
    this.images.update(widgets =>
      widgets.map(widget =>
        widget.id === this.selectedWidget()?.id ?
          {...widget, rotation : widget.rotation + rotationModifier} :
          widget
      ));
  }
}
