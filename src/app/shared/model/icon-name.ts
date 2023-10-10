import { cropIcon } from '../../../assets/icons/crop';
import { imageIcon } from '../../../assets/icons/image';
import { trashIcon } from '../../../assets/icons/trash';
import { typeIcon } from '../../../assets/icons/type';

export type IconName = 'image' | 'trash' | 'crop' | 'type';
export const iconByNameMapper: Record<IconName, string> = {
  'image': imageIcon,
  'trash': trashIcon,
  'type': typeIcon,
  'crop': cropIcon,
};
