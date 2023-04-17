// TODO: change DEFAULT_MIN_PRESS_DURATION in node_modules/react-native/Libraries/Pressability/Pressability.js to 0 to fix delay on press
import { useRef, FC } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

import { PropTypes } from './types';

import Icon from '@/components/Icon';

const ButtonIcon: FC<PropTypes> = (props) => {
  const { icon, onPress, rotate, color, iconColor, borderColor, borderWidth, disabled } = props;

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      transform: rotate ? [{ rotate: '45deg' }] : [{ rotate: '0deg' }],
    },
    icon: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 22,
      backgroundColor: color, //isFocused ? colors.lavander : `rgba(255, 255, 255, 0.1)`, //colors.accent
      borderColor,
      borderWidth,
    },
  });

  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const onPressOut = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (disabled) return;
    onPress();
  };

  const animatedStyle = {
    opacity,
    transform: [{ scale }],
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={handlePress}
      style={styles.button}>
      <Animated.View style={[styles.icon, animatedStyle]}>
        <Icon iconName={icon} color={iconColor} variant="Linear" />
      </Animated.View>
    </Pressable>
  );
};

export default ButtonIcon;
