import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
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
export class ArtboardComponent implements OnChanges {
  @Input() selectedFile: File | null;

  images = this.widgetStore.images;
  selectedWidget = this.widgetStore.selectedWidget;

  @ViewChild('artboard') artboard: ElementRef;

  constructor(private widgetStore: WidgetStore) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFile']) {
      this.selectFile(this.selectedFile);
    }
  }

  widgetById(_: number, widget: ArtboardWidgetImage) {
    return widget.id;
  }

  selectWidget(widget: ArtboardWidgetImage) {
    this.widgetStore.selectWidget(widget);
  }

  selectFile(file: File | null) {
    if (file) {
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
              }
            };
            this.images.update(images => [...images, image]);
          }
        });

        reader.readAsDataURL(file);
      }
    }
  }
}
