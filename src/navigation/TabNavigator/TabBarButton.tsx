import { FC, useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import { useTheme, Paragraph } from 'react-native-paper';

import { TabBarButtonProps } from './types';

import Icon from '@/components/Icon';

// TODO: change DEFAULT_MIN_PRESS_DURATION in node_modules/react-native/Libraries/Pressability/Pressability.js to 0 to fix delay on press

const TabBarButton: FC<TabBarButtonProps> = (props) => {
  const { icon, label, accessibilityState, onPress } = props;
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 22,
      backgroundColor: accessibilityState?.selected ? colors.accent : `rgba(255, 255, 255, 0.1)`,
    },
    label: {
      color: accessibilityState?.selected ? colors.accent : colors.background,
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

  const animatedStyle = {
    opacity,
    transform: [{ scale }],
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={styles.button}>
      <Animated.View style={[styles.icon, animatedStyle]}>
        <Icon
          iconName={icon}
          color={accessibilityState?.selected ? colors.primary : colors.background}
          variant="Linear"
          size={24}
        />
      </Animated.View>
      <Paragraph style={styles.label}>{label}</Paragraph>
    </Pressable>
  );
};

export default TabBarButton;
