import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipDirective } from '../../../directives/tooltip.directive';
import { IconName } from '../../../model/icon-name';
import { TooltipPosition } from '../../../model/tooltip-position';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-toolbar-button',
  standalone: true,
  imports: [CommonModule, IconComponent, TooltipDirective],
  templateUrl: './toolbar-button.component.html',
  styleUrls: ['./toolbar-button.component.scss']
})
export class ToolbarButtonComponent {
  @Input({required: true}) icon: IconName;
  @Input({required: true}) tooltipLabel: string;
  @Input({required: true}) tooltipPosition: TooltipPosition;
  @Input() disabled = false;
  @Input() slider = false;
  @Input() sliderMin = 0;
  @Input() sliderMax = 200;
  @Input() sliderValue = 100;

  @Output() buttonClick = new EventEmitter<void>();
  @Output() sliderChange = new EventEmitter<number>();


  onChange(event: Event) {
    const inputValue = this.#getInputValue(event);
    if (inputValue) {
      this.sliderChange.emit(parseInt(inputValue) / 100);
    }
  }
  #getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
