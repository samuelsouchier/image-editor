import { Injectable, signal, WritableSignal } from '@angular/core';
import { ArtboardWidgetImage } from '../model/artboard-widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetStore {

  images: WritableSignal<ArtboardWidgetImage[]> = signal([]);
  selectedWidget: WritableSignal<ArtboardWidgetImage | null> = signal(null);

  selectWidget(widget: ArtboardWidgetImage) {
    if (this.selectedWidget()?.id !== widget.id) {
      this.selectedWidget.set(widget);
      this.images.update(images => [...images.filter(image => image.id !== widget.id), widget]);
    }
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

  clearSelectedWidget() {
    this.selectedWidget.set(null);
  }

  deleteWidget() {
    this.images.update(widgets =>
      widgets.filter(widget => widget.id !== this.selectedWidget()?.id));
    this.selectedWidget.set(null);
  }

  updateWidget(newWidget: ArtboardWidgetImage) {
    this.images.update(widgets =>
      widgets.map(widget => widget.id === newWidget.id ? newWidget : widget));
  }
}
