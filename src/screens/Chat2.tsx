/**
 * TODO: problema quota exceeded (disabilitata per il momento)
 * TODO: schiarire immagine di sfondo
 * TODO: quick reply (per rispondere con un messaggio predefinito)
 * TODO: capire come renderizzare un componente
 * */
import { useQuery } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useState } from 'react';
import { View, DeviceEventEmitter, ImageBackground } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { ActivityIndicator, useTheme, Snackbar } from 'react-native-paper';
import 'dayjs/locale/it';

import { api } from '@/api';
import avatar from '@/assets/images/therapist-avatar.png';
import {
  CustomView,
  Message,
  Bubble,
  Time,
  Send,
  Composer,
  InputToolbar,
  DeleteBanner,
} from '@/components/Chat';
import { useSocket, useThrottleCallback } from '@/hook';

const image = require('@/assets/images/chat-background.png');

const Chat2 = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [composerHeight, setComposerHeight] = useState<number>(41);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { socket, connected, loading, error, refreshSocket } = useSocket();

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('connect_error');
        socket.off('chat message');
      }
    };
  }, [socket]);
  const { colors } = useTheme();

  const { data: authUser } = useQuery(['authUser'], api.user.getMeFn);
  const chatId = `${authUser?.id}-${authUser?.therapistId}`;

  const { isLoading } = useQuery(['chat', chatId], api.chat.getChatFn, {
    onSuccess: (data: IMessage[]) => {
      const preparedData = data.map((message) => {
        // Rimuovere questa parte quando sarà possibile caricare l'avatar del terapeuta dal server
        message.user.avatar = authUser._id === message.user._id ? authUser.avatar : avatar;
        message.user.name = authUser._id !== message.user._id && 'Bot';
        return message;
      });
      setMessages(preparedData);
      DeviceEventEmitter.emit('loading', false);
    },
    onError: (error) => {
      console.warn(error);
    },
  });

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('loading', (isLoading) =>
      setIsDeleting(isLoading)
    );
    return () => {
      listener.remove();
    };
  }, []);

  const onSend = useCallback(
    (messages: IMessage[] | [] = []) => {
      const preparedMessages = messages.map((message: IMessage) => {
        return {
          chatid: chatId,
          ...message,
        };
      });

      setMessages((previousMessages) => GiftedChat.append(previousMessages, preparedMessages));
      socket?.emit('chat message', preparedMessages[0]);
    },
    [socket]
  );

  const selectMessage = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMessages((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const throttledSelectMessage = useThrottleCallback(selectMessage, 200, true);

  if (isLoading || loading || isDeleting) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.primary} animating />
      </View>
    );
  }

  if (error && !connected) {
    console.log({ error });
    return (
      <Snackbar
        visible={!!error}
        onDismiss={() => refreshSocket()}
        action={{
          label: 'Riprova',
          onPress: () => refreshSocket(),
        }}>
        Errore di connessione
      </Snackbar>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={image}
        style={{ flex: 1, justifyContent: 'center' }}
        resizeMode="repeat">
        <DeleteBanner
          selectedMessages={selectedMessages}
          setSelectedMessages={setSelectedMessages}
        />
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: authUser?.id,
            name: authUser?.name,
          }}
          locale="it"
          dateFormat="DD/MM/YYYY"
          timeFormat="HH:mm"
          placeholder="Messaggio..."
          keyboardShouldPersistTaps="never"
          renderLoading={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color={colors.primary} animating />
            </View>
          )}
          extraData={{ selectedMessages }}
          onPress={(_context, message) => {
            if (selectedMessages.length === 0) return;
            throttledSelectMessage(message?._id.toString());
          }}
          onLongPress={(_context, message) => selectMessage(message?._id.toString())}
          renderUsernameOnMessage
          alwaysShowSend
          listViewProps={{
            style: {
              marginBottom: composerHeight - 15,
            },
          }}
          renderMessage={(props) => <Message {...props} />}
          renderBubble={(props) => <Bubble {...props} />}
          renderCustomView={(props) => <CustomView {...props} />}
          renderTime={(props) => <Time {...props} />}
          renderSend={(props) => <Send {...props} />}
          renderComposer={(props) => (
            <Composer
              {...props}
              composerHeight={composerHeight}
              setComposerHeight={setComposerHeight}
            />
          )}
          renderInputToolbar={(props) => <InputToolbar {...props} />}
        />
      </ImageBackground>
    </View>
  );
};

export default Chat2;
