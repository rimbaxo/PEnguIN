import * as iconsax from 'iconsax-react-native';
import type { IconProps } from 'iconsax-react-native';
import { FC } from 'react';
import { useTheme } from 'react-native-paper';

interface Props extends IconProps {
  /**
   * Name of the icon to show.
   *
   * @see https://iconsax.github.io/iconsax/icons/
   */
  iconName: IconName;
}

const Icon: FC<Props> = (props) => {
  const { colors } = useTheme();
  const { iconName, variant = 'Linear', color = colors.primary, size = 24 } = props;
  const IconComponent = iconsax[iconName];

  return <IconComponent variant={variant} color={color} size={size} />;
};

export default Icon;
