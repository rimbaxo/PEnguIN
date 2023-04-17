import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState, FC } from 'react';
import { Animated, StyleSheet, View, DeviceEventEmitter } from 'react-native';
import { useTheme, Paragraph } from 'react-native-paper';

import { api } from '@/api';
import ButtonIcon from '@/components/ButtonIcon';

interface IProps {
  selectedMessages: string[];
  setSelectedMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

const DeleteBanner: FC<IProps> = (props) => {
  const { selectedMessages, setSelectedMessages } = props;
  const { colors } = useTheme();
  const styles = useStyles(colors);

  const position = useRef(new Animated.Value(-61)).current;
  const numberPosition = useRef(new Animated.Value(0));
  const [currentNumber, setCurrentNumber] = useState<number | undefined>();

  const queryClient = useQueryClient();
  const { mutate: deleteMessage, isLoading } = useMutation(
    (id: string) => api.chat.deleteChatMessageFn(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['chat']);
      },
    }
  );

  const deleteSelectedMessages = () => {
    selectedMessages.forEach((id) => deleteMessage(id));
    setSelectedMessages([]);
  };

  useEffect(() => {
    if (isLoading) return DeviceEventEmitter.emit('loading', true);
  }, [isLoading]);

  // Animation below
  useEffect(() => {
    currentNumber === undefined && setCurrentNumber(selectedMessages.length);
  }, [selectedMessages]);

  useEffect(() => {
    if (currentNumber === selectedMessages.length) return;
    if (currentNumber < selectedMessages.length) increaseNumber();
    if (currentNumber > selectedMessages.length) decreaseNumber();
  }, [selectedMessages]);

  const animatedStyle = {
    transform: [{ translateY: position }],
  };

  const numberAnimatedStyle = {
    transform: [{ translateY: numberPosition.current }],
  };

  const increaseNumber = () => {
    Animated.timing(numberPosition.current, {
      toValue: 28,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      numberPosition.current.setValue(0);
      setCurrentNumber(selectedMessages.length);
    });
  };

  const decreaseNumber = () => {
    Animated.timing(numberPosition.current, {
      toValue: -28,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      numberPosition.current.setValue(0);
      setCurrentNumber(selectedMessages.length);
    });
  };

  const slideDown = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const slideUp = () => {
    Animated.timing(position, {
      toValue: -61,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (selectedMessages.length > 0) {
      slideDown();
    } else {
      slideUp();
    }
  }, [selectedMessages]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.left}>
        <View style={styles.numberWrapper}>
          <Animated.Text style={[numberAnimatedStyle, styles.number]}>
            {currentNumber + 1}
          </Animated.Text>
          <Animated.Text style={[numberAnimatedStyle, styles.number]}>
            {currentNumber}
          </Animated.Text>
          <Animated.Text style={[numberAnimatedStyle, styles.number]}>
            {currentNumber - 1}
          </Animated.Text>
        </View>
        <Paragraph style={styles.text}>
          {selectedMessages.length === 1 ? 'Elimina il messaggio' : 'Elimina i messaggi'}
        </Paragraph>
      </View>
      <ButtonIcon
        icon="Trash"
        onPress={deleteSelectedMessages}
        color="rgba(255, 255, 255, 0.1)"
        iconColor={colors.background}
      />
    </Animated.View>
  );
};

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    left: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    number: {
      color: colors.background,
      fontSize: 18,
      fontWeight: 'bold',
      paddingVertical: 3,
    },
    numberWrapper: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    text: {
      color: colors.background,
      fontSize: 18,
      fontWeight: 'bold',
      top: 2,
      marginLeft: 10,
    },
    container: {
      position: 'absolute',
      top: -61,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: colors.primary,
      height: 61,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
  });

export default DeleteBanner;
