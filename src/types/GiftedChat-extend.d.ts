import { ImageSource } from 'react-native';
import * as _GiftedChat from 'react-native-gifted-chat';

declare module 'react-native-gifted-chat' {
  export interface IMessage {
    component?: ImageSource;
  }
  export interface MessageProps {
    extraData?: {
      selectedMessages?: string[];
    };
  }
  export interface BubbleProps {
    extraData?: {
      selectedMessages?: string[];
    };
  }
}
