import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { iconByNameMapper, IconName } from '../../model/icon-name';

import { IconComponent } from './icon.component';

describe(IconComponent.name, () => {
  let spectator: Spectator<IconComponent>;
  const createComponent = createComponentFactory({
    component: IconComponent,
    shallow: true,
  });

  for (const key in Object.keys(iconByNameMapper)) {
    const iconName = Object.keys(iconByNameMapper)[key] as IconName;
    it(`should match snapshot for ${iconName} icon`, () => {
      spectator = createComponent({props: {iconName}});

      expect(spectator.fixture).toMatchSnapshot();
    });
  }
});
