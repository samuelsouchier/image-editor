import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, ViewChild } from '@angular/core';
import { BASE_IMAGE_HEIGHT } from '../../constants';
import { ArtboardWidgetImage } from '../../model/artboard-widget';
import { WidgetStore } from '../../stores/widget.store';
import { IconComponent } from '../icon/icon.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-artboard',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDragHandle, IconComponent, ToolbarComponent],
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.scss']
})
export class ArtboardComponent {
  selectedFile = this.widgetStore.selectedFile;

  images = this.widgetStore.images;
  selectedWidget = this.widgetStore.selectedWidget;

  @ViewChild('artboard') artboard: ElementRef;

  constructor(private widgetStore: WidgetStore) {
    effect(() => {
      this.selectFile(this.selectedFile()?.file || null);
    });
  }

  widgetById(_: number, widget: ArtboardWidgetImage) {
    return widget.id;
  }

  selectWidget(widget: ArtboardWidgetImage) {
    this.widgetStore.selectWidget(widget);
  }

  selectFile(file: File | null) {
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
            filters: {
              brightness: 1,
              blur: 0,
              contrast: 1,
              sepia: 0,
              grayscale: 0,
            }
          };
          this.images.update(images => [...images, image]);
        }
      });

      reader.readAsDataURL(file);
    }
  }
}
