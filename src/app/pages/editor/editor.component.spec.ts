import { signal, WritableSignal } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { mockProvider } from '@ngneat/spectator/jest';
import * as crypto from 'crypto';
import { artboardWidgetImageFixture } from '../../../fixtures/artboard-widget-image';
import { ArtboardWidgetImage } from '../../model/artboard-widget';
import { UploadedFile } from '../../model/uploaded-file';
import { WidgetStore } from '../../stores/widget.store';

import { EditorComponent } from './editor.component';

describe(EditorComponent.name, () => {
  let spectator: Spectator<EditorComponent>;
  const images = signal<ArtboardWidgetImage[]>([artboardWidgetImageFixture]);
  const selectedWidget = signal<ArtboardWidgetImage>(artboardWidgetImageFixture);
  const selectedFile: WritableSignal<UploadedFile | null> = signal(null);
  const createComponent = createComponentFactory({
    component: EditorComponent,
    providers: [
      mockProvider(WidgetStore, {
        images,
        selectedFile,
        selectedWidget,
        updateWidget: (newWidget: ArtboardWidgetImage) => selectedWidget.set(newWidget),
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

  it('should select a file', () => {
    // Required for jest to work with crypto
    Object.defineProperty(globalThis, 'crypto', {
      value: {
        randomUUID: () => crypto.randomUUID(),
      },
    });

    const mockFile = {
      name: 'file name',
    };
    const mockInputEventTarget: EventTarget = {
      files: {
        item () {return mockFile;},
      },
    } as unknown as EventTarget;
    const expected = mockFile;

    jest.mock('crypto', () => {
      return {
        randomUUID: jest.fn(),
      };
    });


    expect(selectedFile()).toEqual(null);

    spectator.component.onSelectFile(mockInputEventTarget);

    expect(selectedFile()?.file).toEqual(expected);
  });
});
