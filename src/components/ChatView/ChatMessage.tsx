import { format } from 'date-fns';
import { useMemo, FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Paragraph, Avatar } from 'react-native-paper';

import { type Message } from './ChatView';

type Props = {
  message: Message;
  chatId: string;
};

const ChatMessage: FC<Props> = (props) => {
  const { message, chatId } = props;

  const isUserMessage = chatId.split('-')[0] === message.sender;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme, isUserMessage), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Paragraph>{message.message}</Paragraph>
        <Paragraph style={styles.time}>{format(new Date(message.createdAt), 'kk:mm')}</Paragraph>
        {isUserMessage ? (
          <>
            <View style={styles.rightArrow} />
            <View style={styles.rightArrowOverlap} />
          </>
        ) : (
          <>
            <View style={styles.leftArrow} />
            <View style={styles.leftArrowOverlap} />
          </>
        )}
      </View>
      {!isUserMessage && <Avatar.Image size={44} source={{ uri: 'https://picsum.photos/200' }} />}
    </View>
  );
};

const createStyles = (theme: ReactNativePaper.Theme, isUserMessage: boolean) => {
  const userBackgroundColor = theme.colors.lavander;
  const botBackgroundColor = theme.colors.peach;

  return StyleSheet.create({
    container: {
      flexDirection: 'row-reverse',
      alignItems: 'flex-end',
      justifyContent: isUserMessage ? 'flex-start' : 'flex-end',
      margin: theme.gaps.gutter,
    },
    bubble: {
      display: 'flex',
      backgroundColor: isUserMessage ? userBackgroundColor : botBackgroundColor,
      padding: theme.gaps.gutter,
      borderRadius: theme.shapes.radius,
      marginLeft: theme.gaps.gutter,
      maxWidth: '80%',
    },
    time: {
      color: `${theme.colors.text}99`,
      alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
      backgroundColor: 'rgba(0,0,0,.05)',
      paddingHorizontal: 8,
      paddingVertical: 2.5,
      borderRadius: 5,
    },
    rightArrow: {
      position: 'absolute',
      backgroundColor: userBackgroundColor,
      width: 20,
      height: 25,
      bottom: 0,
      borderBottomLeftRadius: 25,
      right: -10,
    },
    rightArrowOverlap: {
      position: 'absolute',
      backgroundColor: theme.colors.background,
      width: 20,
      height: 35,
      bottom: -6,
      borderBottomLeftRadius: 18,
      right: -20,
    },
    leftArrow: {
      position: 'absolute',
      backgroundColor: botBackgroundColor,
      width: 20,
      height: 25,
      bottom: 0,
      borderBottomRightRadius: 25,
      left: -10,
    },

    leftArrowOverlap: {
      position: 'absolute',
      backgroundColor: theme.colors.background,
      width: 20,
      height: 35,
      bottom: -6,
      borderBottomRightRadius: 18,
      left: -20,
    },
  });
};

export default ChatMessage;
