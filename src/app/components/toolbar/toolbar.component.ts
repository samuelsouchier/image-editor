import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Output } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { ArtboardWidgetImage } from '../../model/artboard-widget';
import { WidgetStore } from '../../stores/widget.store';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, IconComponent, TooltipDirective],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  selectedWidget = this.widgetStore.selectedWidget;
  imageBrightness = computed(() => ((this.selectedWidget()?.filters.brightness ?? 1) * 100) ?? 100);

  @Output() selectFile = new EventEmitter<void>();

  constructor(private widgetStore: WidgetStore) {}

  rotateWidget(direction: 'forward' | 'backward') {
    this.widgetStore.rotateWidget(direction);
  }
  clearSelectedWidget() {
    this.widgetStore.clearSelectedWidget();
  }
  deleteWidget() {
    this.widgetStore.deleteWidget();
  }

  brightnessChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue) {
      const newBrightness = parseInt(inputValue) / 100;
      if (this.selectedWidget()) {
        const newWidget: ArtboardWidgetImage = {...this.selectedWidget()!, filters: {...this.selectedWidget()!.filters, brightness: newBrightness}};
        this.widgetStore.updateWidget(newWidget);
      }
    }
  }

}
