import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Output } from '@angular/core';
import { ZOOM_INCREMENT } from '../../constants';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { ArtboardWidgetImage } from '../../model/artboard-widget';
import { WidgetStore } from '../../stores/widget.store';
import { IconComponent } from '../icon/icon.component';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, IconComponent, TooltipDirective, ToolbarButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  selectedWidget = this.widgetStore.selectedWidget;
  imageBrightness = computed(() => ((this.selectedWidget()?.filters.brightness ?? 1) * 100) ?? 100);
  imageContrast = computed(() => ((this.selectedWidget()?.filters.contrast ?? 1) * 100) ?? 100);
  imageSepia = computed(() => ((this.selectedWidget()?.filters.sepia ?? 0) * 100) ?? 0);
  imageGrayscale = computed(() => ((this.selectedWidget()?.filters.grayscale ?? 0) * 100) ?? 0);
  imageBlur = computed(() => ((this.selectedWidget()?.filters.blur ?? 0) * 100) ?? 0);

  @Output() selectFile = new EventEmitter<void>();

  constructor(private widgetStore: WidgetStore) {}

  clearSelectedWidget() {
    this.widgetStore.clearSelectedWidget();
  }
  deleteWidget() {
    this.widgetStore.deleteWidget();
  }
  rotateWidget(direction: 'forward' | 'backward') {
    if (this.selectedWidget()) {
      const rotation = this.selectedWidget()!.rotation + (90 * (direction === 'forward' ? 1 : -1));
      const newWidget: ArtboardWidgetImage = {...this.selectedWidget()!, rotation};
      this.widgetStore.updateWidget(newWidget);
    }
  }

  brightnessChange(inputValue: number) {
    if (this.selectedWidget()) {
      const newWidget: ArtboardWidgetImage = {...this.selectedWidget()!, filters: {...this.selectedWidget()!.filters, brightness: inputValue}};
      this.widgetStore.updateWidget(newWidget);
    }
  }

  contrastChange(inputValue: number) {
    if (this.selectedWidget()) {
      const newWidget: ArtboardWidgetImage = {...this.selectedWidget()!, filters: {...this.selectedWidget()!.filters, contrast: inputValue}};
      this.widgetStore.updateWidget(newWidget);
    }
  }

  blurChange(inputValue: number) {
    if (this.selectedWidget()) {
      const newWidget: ArtboardWidgetImage = {...this.selectedWidget()!, filters: {...this.selectedWidget()!.filters, blur: inputValue}};
      this.widgetStore.updateWidget(newWidget);
    }
  }

  sepiaChange(inputValue: number) {
    if (this.selectedWidget()) {
      const newWidget: ArtboardWidgetImage = {...this.selectedWidget()!, filters: {...this.selectedWidget()!.filters, sepia: inputValue}};
      this.widgetStore.updateWidget(newWidget);
    }
  }

  grayscaleChange(inputValue: number) {
    if (this.selectedWidget()) {
      const newWidget: ArtboardWidgetImage = {...this.selectedWidget()!, filters: {...this.selectedWidget()!.filters, grayscale: inputValue}};
      this.widgetStore.updateWidget(newWidget);
    }
  }

  zoom(direction: 'in' | 'out') {
    if (this.selectedWidget()) {
      const scale = (this.selectedWidget()?.scale ?? 1) + ZOOM_INCREMENT * (direction === 'in' ? 1 : -1);
      const newWidget: ArtboardWidgetImage = {...this.selectedWidget()!, scale};
      this.widgetStore.updateWidget(newWidget);
    }
  }
}
