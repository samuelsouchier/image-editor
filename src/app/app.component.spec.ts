import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    shallow: true,
  });

  it('should match snapshot', () => {
    spectator = createComponent();

    expect(spectator.fixture).toMatchSnapshot();
  });
});
