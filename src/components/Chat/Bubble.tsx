import { useRef, useEffect } from 'react';
import { useWindowDimensions, Animated, View } from 'react-native';
import { BubbleProps, IMessage, Bubble as RNGCBubble } from 'react-native-gifted-chat';
import { useTheme } from 'react-native-paper';

import Icon from '@/components/Icon';

const Bubble = (
  props: Readonly<BubbleProps<IMessage>> &
    Readonly<{
      children?: React.ReactNode;
    }>
): React.ReactElement => {
  const {
    currentMessage: { _id },
    extraData: { selectedMessages },
    position: _position,
  } = props;
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const isSelecting = selectedMessages.length > 0;
  const isSelected = selectedMessages.includes(_id.toString());
  const initialValue = _position === 'right' ? 50 : 65;

  const position = useRef(new Animated.Value(initialValue)).current;
  const iconPosition = useRef(new Animated.Value(30)).current;

  const animatedStyle = {
    transform: [{ translateX: position }],
  };

  const iconAnimatedStyle = {
    transform: [{ translateY: iconPosition }],
  };

  const slideLeft = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const slideRight = () => {
    Animated.timing(position, {
      toValue: initialValue,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const slideIconUp = () => {
    Animated.spring(iconPosition, {
      toValue: 0,
      speed: 30,
      useNativeDriver: true,
    }).start();
  };

  const slideIconDown = () => {
    Animated.spring(iconPosition, {
      toValue: 30,
      speed: 30,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isSelecting) {
      slideLeft();
    } else {
      slideRight();
    }
  }, [isSelecting]);

  useEffect(() => {
    if (isSelected) {
      slideIconUp();
    } else {
      slideIconDown();
    }
  }, [isSelected]);

  return (
    <Animated.View
      style={[
        _position === 'right' ? animatedStyle : null,
        {
          width: _position === 'left' ? width - 65 : 'auto',
          flexDirection: 'row',
          alignItems: 'flex-end',
        },
      ]}>
      <RNGCBubble
        {...props}
        touchableProps={{
          hitSlop: {
            left: width,
            right: width,
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: colors.lavander,
          },
          left: {
            backgroundColor: colors.peach,
          },
        }}
        textStyle={{
          right: {
            color: colors.text,
          },
          left: {
            color: colors.text,
          },
        }}
      />
      <Animated.View
        style={[
          animatedStyle,
          {
            width: 50,
            height: 50,
            zIndex: -1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          },
        ]}>
        <View
          style={{
            width: 25,
            height: 25,
            borderColor: colors.accent,
            backgroundColor: colors.transparent,
            borderWidth: 2,
            borderRadius: 25,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Animated.View style={[iconAnimatedStyle]}>
            <Icon iconName="TickCircle" size={35} color={colors.accent} variant="Bold" />
          </Animated.View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default Bubble;
