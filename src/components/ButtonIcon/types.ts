export interface PropTypes {
  /** Icon name @see https://iconsax-react.pages.dev */
  icon: IconName;
  /** Focus state of button icon */
  isFocused?: boolean;
  disabled?: boolean;
  /** Function to call on press */
  onPress: () => void;
  rotate?: boolean;
  color?: string;
  iconColor?: string;
  borderColor?: string;
  borderWidth?: number;
}
