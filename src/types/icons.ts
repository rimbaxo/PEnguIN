import * as Icons from 'iconsax-react-native';

declare global {
  type IconName = Exclude<keyof typeof Icons, 'Icon'>;
}
