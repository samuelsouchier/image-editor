import { signal } from '@angular/core';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { artboardWidgetImageFixture } from '../../../fixtures/artboard-widget-image';
import { ArtboardWidgetImage } from '../../model/artboard-widget';
import { WidgetStore } from '../../stores/widget.store';

import { ToolbarComponent } from './toolbar.component';

describe(ToolbarComponent.name, () => {
  let spectator: Spectator<ToolbarComponent>;
  const selectedWidget = signal<ArtboardWidgetImage>(artboardWidgetImageFixture);

  const createComponent = createComponentFactory({
    component: ToolbarComponent,
    providers: [
      mockProvider(WidgetStore, {
        selectedWidget,
        updateWidget: (newWidget: ArtboardWidgetImage) => selectedWidget.set(newWidget),
      }),
    ],
    shallow: true,
  });

  it('should match snapshot', () => {
    spectator = createComponent();

    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should change brightness', () => {
    const event: Event = ({
      target: {
        value: '150',
      }
    }) as unknown as Event;
    const expected = 1.5;
    spectator = createComponent();
    spectator.component.brightnessChange(event);

    expect(selectedWidget().filters.brightness).toEqual(expected);
  });

  it('should change contrast', () => {
    const event: Event = ({
      target: {
        value: '150',
      }
    }) as unknown as Event;
    const expected = 1.5;
    spectator = createComponent();
    spectator.component.contrastChange(event);

    expect(selectedWidget().filters.contrast).toEqual(expected);
  });

  it('should change blur', () => {
    const event: Event = ({
      target: {
        value: '150',
      }
    }) as unknown as Event;
    const expected = 1.5;
    spectator = createComponent();
    spectator.component.blurChange(event);

    expect(selectedWidget().filters.blur).toEqual(expected);
  });

  it('should change sepia', () => {
    const event: Event = ({
      target: {
        value: '150',
      }
    }) as unknown as Event;
    const expected = 1.5;
    spectator = createComponent();
    spectator.component.sepiaChange(event);

    expect(selectedWidget().filters.sepia).toEqual(expected);
  });

  it('should change grayscale', () => {
    const event: Event = ({
      target: {
        value: '150',
      }
    }) as unknown as Event;
    const expected = 1.5;
    spectator = createComponent();
    spectator.component.grayscaleChange(event);

    expect(selectedWidget().filters.grayscale).toEqual(expected);
  });
});
