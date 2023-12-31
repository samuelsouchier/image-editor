import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { ArtboardWidgetImage } from '../model/artboard-widget';
import { UploadedFile } from '../model/uploaded-file';

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
