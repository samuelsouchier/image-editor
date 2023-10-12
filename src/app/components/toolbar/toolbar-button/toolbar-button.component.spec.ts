import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ToolbarButtonComponent } from './toolbar-button.component';

describe(ToolbarButtonComponent.name, () => {
  let spectator: Spectator<ToolbarButtonComponent>;
  const createComponent = createComponentFactory({
    component: ToolbarButtonComponent,
    shallow: true,
  });

  it('should match snapshot without a slider', () => {
    spectator = createComponent(
      {
        props: {
          icon: 'image',
          tooltipLabel: 'tooltip label',
          tooltipPosition: 'top',
        }
      }
    );

    expect(spectator.fixture).toMatchSnapshot();
  });
});
