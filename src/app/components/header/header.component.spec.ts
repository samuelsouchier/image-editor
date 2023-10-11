import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { HeaderComponent } from './header.component';

describe(HeaderComponent.name, () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    shallow: true,
  });

  it('should match snapshot', () => {
    spectator = createComponent();

    expect(spectator.fixture).toMatchSnapshot();
  });
});
