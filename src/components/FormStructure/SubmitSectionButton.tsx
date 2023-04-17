import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

const SubmitSectionButton = ({ onClick }: { onClick: () => void }) => {
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
    <Pressable onPress={onClick} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.text}>Vai a Riepilogo</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 100,
    paddingRight: 5,
    paddingLeft: 5,
    right: 10,
  },
  text: {
    textAlign: 'center',
  },
});

export default SubmitSectionButton;
