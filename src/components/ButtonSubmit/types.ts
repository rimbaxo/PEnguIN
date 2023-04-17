import Animated from 'react-native-reanimated';

export interface PropTypes {
  display: Animated.SharedValue<string>;
  size?: 'small' | 'large';
  text: string;
  isFocused?: string;
  onPress: () => void;
  color: string;
}
