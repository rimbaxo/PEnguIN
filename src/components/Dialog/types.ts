import { IconTypes } from '../../types/icons';

export interface PropTypes {
  /** Determines Whether the dialog is visible */
  visible: boolean;
  /** Determines whether clicking outside the dialog dismiss it. */
  dismissable?: boolean;
  /** Icon name @see https://iconsax-react.pages.dev */
  icon: typeof IconTypes;
  /**
   * Icon color
   *
   * *es. `#FFFFFF`*
   */
  iconColor: string;
  /** Title shown on top of dialog */
  title: string;
  /**
   * Text of dialog
   *
   * use `\n` to create a new line.
   * */
  content: string;
  actions: {
    /**
     * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
     * - `text` - flat button without background or outline, used for the lowest priority actions, especially when presenting multiple options.
     * - `outlined` - button with an outline without background, typically used for important, but not primary action – represents medium emphasis.
     * - `contained` - button with a background color, used for important action, have the most visual impact and high emphasis.
     *
     * @default `contained`
     */
    mode?: 'text' | 'outlined' | 'contained';
    /** Function to execute on press. */
    onPress: () => void;
    /** Label text of the button.*/
    text: string;
    /**
     * Custom text color for flat button, or background color for contained button.
     *
     * @default `colors.primary` from theme
     */
    color?: string;
  }[];
}
