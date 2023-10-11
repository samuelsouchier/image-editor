import { cropIcon } from '../../assets/icons/crop';
import { imageIcon } from '../../assets/icons/image';
import { maximizeIcon } from '../../assets/icons/maximize';
import { moveIcon } from '../../assets/icons/move';
import { trashIcon } from '../../assets/icons/trash';
import { typeIcon } from '../../assets/icons/type';

export type IconName = 'image' | 'trash' | 'crop' | 'type' | 'maximize' | 'move';
export const iconByNameMapper: Record<IconName, string> = {
  'image': imageIcon,
  'trash': trashIcon,
  'type': typeIcon,
  'crop': cropIcon,
  'maximize': maximizeIcon,
  'move': moveIcon,
};
