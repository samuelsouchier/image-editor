import { signal, WritableSignal } from '@angular/core';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { artboardWidgetImageFixture } from '../../../fixtures/artboard-widget-image';
import { UploadedFile } from '../../model/UploadedFile';
import { ArtboardWidgetImage } from '../../model/artboard-widget';
import { WidgetStore } from '../../stores/widget.store';

import { ArtboardComponent } from './artboard.component';

describe(ArtboardComponent.name, () => {
  const images = signal<ArtboardWidgetImage[]>([artboardWidgetImageFixture]);
  const selectedWidget = signal<ArtboardWidgetImage | null>(artboardWidgetImageFixture);
  const selectedFile: WritableSignal<UploadedFile | null> = signal(null);
  let spectator: Spectator<ArtboardComponent>;
  const createComponent = createComponentFactory({
    component: ArtboardComponent,
    providers: [
      mockProvider(WidgetStore, {
        images,
        selectedFile,
        selectedWidget,
        updateWidget: (newWidget: ArtboardWidgetImage) => selectedWidget.set(newWidget),
        clearSelectedWidget: () => selectedWidget.set(null),
      }),
    ],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should match snapshot', () => {

    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should select a widget', () => {
    const mockWidget = artboardWidgetImageFixture;
    spectator.component.selectWidget(mockWidget);

    expect(selectedWidget()).toEqual(mockWidget);
  });

  it('should clear selected widget', () => {
    const mockWidget = artboardWidgetImageFixture;
    const expected = null;

    expect(selectedWidget()).toEqual(mockWidget);
    spectator.component.clearSelectedWidget();

    expect(selectedWidget()).toEqual(expected);
  });
});
