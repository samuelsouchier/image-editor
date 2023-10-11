import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { UploadedFile } from '../model/UploadedFile';
import { ArtboardWidgetImage } from '../model/artboard-widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetStore {

  images: WritableSignal<ArtboardWidgetImage[]> = signal([]);
  selectedWidget = computed(() => this.images().find(widget => widget.id === this.selectedWidgetId()));
  selectedWidgetId: WritableSignal<string | null> = signal(null);
  selectedFile: WritableSignal<UploadedFile | null> = signal(null);

  selectWidget(widget: ArtboardWidgetImage) {
    if (this.selectedWidgetId() !== widget.id) {
      this.selectedWidgetId.set(widget.id);
      this.images.update(images => [...images.filter(image => image.id !== widget.id), widget]);
    }
  }

  rotateWidget(direction: 'forward' | 'backward') {
    const rotationModifier = 90 * (direction === 'forward' ? 1 : -1);
    this.images.update(widgets =>
      widgets.map(widget =>
        widget.id === this.selectedWidgetId() ?
          {...widget, rotation : widget.rotation + rotationModifier} :
          widget
      ));
  }

  clearSelectedWidget() {
    this.selectedWidgetId.set(null);
  }

  deleteWidget() {
    this.images.update(widgets =>
      widgets.filter(widget => widget.id !== this.selectedWidgetId()));
    this.selectedWidgetId.set(null);
  }

  updateWidget(newWidget: ArtboardWidgetImage) {
    this.images.update(widgets =>
      widgets.map(widget => widget.id === newWidget.id ? newWidget : widget));
  }
}
