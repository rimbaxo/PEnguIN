import { useMemo, useState, useRef, FC } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import ButtonIcon from '@/components/ButtonIcon';

export type Message = {
  id: string;
  sender: string;
  message: string;
  createdAt: string;
  content: boolean | string;
};

const MESSAGES_MOCK: Message[] = [
  {
    id: '8',
    sender: '62a1fd0ec694040026876asd0',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '2022-11-08T14:41:32.487Z',
    content: '/src/screens/EmotionWheel.tsx',
  },
  {
    id: '7',
    sender: '62a1fd0ec694040026876asd0',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '2022-11-08T14:38:32.487Z',
    content: '/src/screens/EmotionWheel.tsx',
  },
  {
    id: '6',
    sender: '62a1fd0ec694040026876asd0',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '2022-11-08T14:31:32.487Z',
    content: '/src/screens/EmotionWheel.tsx',
  },
  {
    id: '5',
    sender: '62a1fd0ec694040026876asd0',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '2022-11-08T14:20:32.487Z',
    content: '/src/screens/EmotionWheel.tsx',
  },
  {
    id: '4',
    sender: '62a1fd0ec694040026876asd0',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '2022-11-08T14:18:32.487Z',
    content: '/src/screens/EmotionWheel.tsx',
  },
  {
    id: '3',
    sender: '62a1fd0ec694040026876asd0',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '2022-11-08T14:13:32.487Z',
    content: '/src/screens/EmotionWheel.tsx',
  },
  {
    id: '2',
    sender: '62a1fd0ec694040026876asd0',
    message: 'Messaggio del Bot',
    createdAt: '2022-11-08T14:12:32.487Z',
    content: '/src/screens/EmotionWheel.tsx',
  },
  {
    id: '1',
    sender: '62a1fd0ec694040026876330',
    message: "Messaggio dell'utente",
    createdAt: '2022-11-08T14:08:32.487Z',
    content: false,
  },
];
type Props = { chatId: string };
const ChatView: FC<Props> = (props) => {
  const { chatId } = props;
  const [messages, setMessages] = useState<Message[]>(MESSAGES_MOCK);

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const flatlistRef = useRef<FlatList<Message> | null>(null);

  const scrollToBottom = () => flatlistRef.current?.scrollToOffset({ offset: -1, animated: true });
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 600) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -80,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const animatedStyle = {
    opacity,
    transform: [{ translateY }],
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistRef}
        contentContainerStyle={styles.messagesList}
        data={messages}
        scrollEnabled
        onScroll={handleScroll}
        alwaysBounceVertical
        scrollsToTop
        inverted
        renderItem={({ item }) => <ChatMessage message={item} chatId={chatId} />}
      />
      <Animated.View style={[styles.button, animatedStyle]}>
        <ButtonIcon icon="ArrowDown2" color={theme.colors.accent} onPress={scrollToBottom} />
      </Animated.View>
      <ChatInput setMessages={setMessages} scrollToBottom={scrollToBottom} />
    </View>
  );
};

const createStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: theme.colors.background,
    },
    messagesList: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingBottom: 40,
      paddingTop: theme.gaps.gutter,
    },
    button: {
      position: 'absolute',
      right: theme.gaps.gutter,
      bottom: 0,
    },
  });

export default ChatView;
