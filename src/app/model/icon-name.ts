import { blurIcon } from '../../assets/icons/blur';
import { brightnessIcon } from '../../assets/icons/brightness';
import { clearIcon } from '../../assets/icons/clear';
import { contrastIcon } from '../../assets/icons/contrast';
import { cropIcon } from '../../assets/icons/crop';
import { imageIcon } from '../../assets/icons/image';
import { maximizeIcon } from '../../assets/icons/maximize';
import { moveIcon } from '../../assets/icons/move';
import { rotateBackIcon } from '../../assets/icons/rotate-back';
import { rotateForwardIcon } from '../../assets/icons/rotate-forward';
import { trashIcon } from '../../assets/icons/trash';
import { typeIcon } from '../../assets/icons/type';

export type IconName =
  'image'
  | 'trash'
  | 'crop'
  | 'type'
  | 'maximize'
  | 'move'
  | 'clear'
  | 'rotateBack'
  | 'rotateForward'
  | 'brightness'
  | 'blur'
  | 'contrast'
  ;
export const iconByNameMapper: Record<IconName, string> = {
  'image': imageIcon,
  'trash': trashIcon,
  'type': typeIcon,
  'crop': cropIcon,
  'maximize': maximizeIcon,
  'move': moveIcon,
  'clear': clearIcon,
  'rotateBack': rotateBackIcon,
  'rotateForward': rotateForwardIcon,
  'brightness': brightnessIcon,
  'blur': blurIcon,
  'contrast': contrastIcon,
};
