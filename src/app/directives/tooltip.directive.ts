import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { TooltipPosition } from '../model/tooltip-position';

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('tooltip') tooltipTitle: string;
  @Input() position: TooltipPosition;
  tooltip: HTMLElement | null;
  offset = 10;
  transitionDelay = 150;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  @HostListener('mouseup') onMouseUp() {
    if (this.tooltip) {
      this.hide();
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  create() {
    this.tooltip = this.renderer.createElement('div');
    const tooltipText = this.renderer.createText(this.tooltipTitle);

    this.renderer.appendChild(
      this.tooltip,
      tooltipText,
    );

    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.addClass(this.tooltip, `tooltip-${this.position}`);
    this.renderer.appendChild(
      document.body,
      this.tooltip,
    );
  }

  destroy() {
    this.renderer.removeChild(
      document.body,
      this.tooltip,
    );
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'tooltip-visible');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'tooltip-visible');
    setTimeout(() => {
      this.destroy();
      this.tooltip = null;
    }, this.transitionDelay);
  }

  setPosition() {
     const hostPosition = this.el.nativeElement.getBoundingClientRect();
     const tooltipPosition = this.tooltip!.getBoundingClientRect();

    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
     let top, left;

     switch (this.position) {
       case "top":
         top = hostPosition.top - tooltipPosition.height - this.offset;
         left = hostPosition.left + (hostPosition.width - tooltipPosition.width) / 2;
         break;
       case "right":
         top = hostPosition.top + (hostPosition.height / 2) - (tooltipPosition.height / 2);
         left = hostPosition.left + hostPosition.width + this.offset;
         break;
       case "bottom":
         top = hostPosition.top + hostPosition.height + this.offset;
         left = hostPosition.left + (hostPosition.width - tooltipPosition.width) / 2;
         break;
       case "left":
         top = hostPosition.top + (hostPosition.height / 2) - (tooltipPosition.height / 2);
         left = hostPosition.left - tooltipPosition.width - this.offset;
         break;
       default:
         top = 0;
         left = 0;
     }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPosition}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

}
