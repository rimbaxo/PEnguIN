import { useMemo, useRef, useState, FC } from 'react';
import { View, StyleSheet, type TextInput as RNTextInput } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import { type Message } from './ChatView';

import ButtonIcon from '@/components/ButtonIcon';

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  scrollToBottom: () => void;
};
const ChatInput: FC<Props> = (props) => {
  const { setMessages, scrollToBottom } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [text, setText] = useState('');

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const inputRef = useRef<RNTextInput>(null);

  const handleSend = () => {
    if (text.length < 0) return;
    setIsDisabled(true);
    const newMessage = {
      id: Date.now().toString(),
      sender: '62a1fd0ec694040026876330',
      message: text,
      createdAt: new Date().toISOString(),
      content: false,
    };
    setMessages((messages) => [newMessage, ...messages]);
    setText('');
    inputRef.current?.blur();
    scrollToBottom();
    setIsDisabled(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        dense
        multiline
        selectionColor={theme.colors.lavander}
        underlineColor={theme.colors.transparent}
        activeUnderlineColor={theme.colors.transparent}
        activeOutlineColor={theme.colors.background}
        outlineColor={theme.colors.background}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <ButtonIcon
        icon="Send"
        onPress={() => handleSend()}
        color={theme.colors.accent}
        disabled={isDisabled}
      />
    </View>
  );
};

const createStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.gaps.gutter,
    },
    input: {
      flex: 1,
      marginRight: theme.gaps.gutter,
      backgroundColor: theme.colors.lavander,
      borderTopStartRadius: theme.shapes.radius,
      borderTopEndRadius: theme.shapes.radius,
      borderBottomStartRadius: theme.shapes.radius,
      borderBottomEndRadius: theme.shapes.radius,
      alignSelf: 'center',
      paddingTop: 4,
    },
  });

export default ChatInput;
