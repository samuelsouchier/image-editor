import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip.directive';
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

}
