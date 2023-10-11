import { ElementRef, Renderer2 } from '@angular/core';
import { createDirectiveFactory, mockProvider, SpectatorDirective } from '@ngneat/spectator/jest';
import { TooltipDirective } from './tooltip.directive';

describe(TooltipDirective.name, () => {
  let spectator: SpectatorDirective<TooltipDirective>;
  const element = `<div tooltip="Tooltip text" position="top">Testing Tooltip Directive</div>`;
  const createDirective = createDirectiveFactory({
    directive: TooltipDirective,
    template: element,
    providers: [
      mockProvider(ElementRef, {nativeElement: element}),
      Renderer2,
    ],
  });

  it('should display a tooltip', () => {
    spectator = createDirective();
    const showSpy = jest.spyOn(spectator.directive, 'show');
    const createSpy = jest.spyOn(spectator.directive, 'create');
    const setPositionSpy = jest.spyOn(spectator.directive, 'setPosition');
    spectator.dispatchMouseEvent(spectator.element, 'mouseenter');

    expect(showSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalled();
    expect(setPositionSpy).toHaveBeenCalled();
  });

  it('should hide a tooltip', () => {
    const transitionDelay = 150;
    const mockTooltipElement = document.createElement('div');
    spectator = createDirective();
    spectator.directive.tooltip = mockTooltipElement;
    const hideSpy = jest.spyOn(spectator.directive, 'hide');
    const destroySpy = jest.spyOn(spectator.directive, 'destroy');
    spectator.dispatchMouseEvent(spectator.element, 'mouseleave');

    expect(hideSpy).toHaveBeenCalled();
    setTimeout(() => {
      expect(destroySpy).toHaveBeenCalled();
    }, transitionDelay);
  });
});
