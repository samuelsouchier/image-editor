import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { artboardWidgetImageFixture } from '../../fixtures/artboard-widget-image';
import { ArtboardWidgetImage } from '../model/artboard-widget';

import { WidgetStore } from './widget.store';

describe(WidgetStore.name, () => {
  let spectator: SpectatorService<WidgetStore>;
  const createService = createServiceFactory({
    service: WidgetStore,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should select a widget', () => {
    const mockWidget = artboardWidgetImageFixture;
    const expectedImages = [artboardWidgetImageFixture];
    spectator.service.selectWidget(mockWidget);

    expect(spectator.service.images()).toEqual(expectedImages);
    expect(spectator.service.selectedWidgetId()).toEqual(mockWidget.id);
    expect(spectator.service.selectedWidget()).toEqual(mockWidget);
  });

  it('should clear selected widget', () => {
    const mockWidget = artboardWidgetImageFixture;
    const expectedId = null;
    const expectedWidget = undefined;
    const expectedImages: ArtboardWidgetImage[] = [artboardWidgetImageFixture];
    spectator.service.selectWidget(mockWidget);
    spectator.service.clearSelectedWidget();

    expect(spectator.service.images()).toEqual(expectedImages);
    expect(spectator.service.selectedWidgetId()).toEqual(expectedId);
    expect(spectator.service.selectedWidget()).toEqual(expectedWidget);
  });

  it('should rotate a widget', () => {
    const mockWidget = artboardWidgetImageFixture;
    const expectedImages: ArtboardWidgetImage[] = [{...artboardWidgetImageFixture, rotation: 90}];
    spectator.service.selectWidget(mockWidget);
    spectator.service.rotateWidget('forward');

    expect(spectator.service.images()).toEqual(expectedImages);
  });

  it('should delete a widget', () => {
    const mockWidget = artboardWidgetImageFixture;
    const expectedId = null;
    const expectedWidget = undefined;
    const expectedImages: ArtboardWidgetImage[] = [];
    spectator.service.selectWidget(mockWidget);
    spectator.service.deleteWidget();

    expect(spectator.service.images()).toEqual(expectedImages);
    expect(spectator.service.selectedWidgetId()).toEqual(expectedId);
    expect(spectator.service.selectedWidget()).toEqual(expectedWidget);
  });

  it('should update a widget', () => {
    const mockWidget = artboardWidgetImageFixture;
    const expectedId = artboardWidgetImageFixture.id;
    const expectedWidget: ArtboardWidgetImage = {...artboardWidgetImageFixture, name: 'New widget name'};
    const expectedImages: ArtboardWidgetImage[] = [expectedWidget];
    spectator.service.selectWidget(mockWidget);
    spectator.service.updateWidget(expectedWidget);

    expect(spectator.service.images()).toEqual(expectedImages);
    expect(spectator.service.selectedWidgetId()).toEqual(expectedId);
    expect(spectator.service.selectedWidget()).toEqual(expectedWidget);
  });
});
