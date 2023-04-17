import React, { FC, useRef } from 'react';
import { Animated as AnimatedNative, Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import Icon from '@/components/Icon';
import { theme } from '@/theme/theme';

interface Props {
  text: string;
  press: () => void;
  icon: IconName;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TraceButton: FC<Props> = (props) => {
  const { press, text, icon } = props;

  const opacity = useRef(new AnimatedNative.Value(1)).current;
  const scale = useRef(new AnimatedNative.Value(1)).current;

  const onPressIn = () => {
    AnimatedNative.parallel([
      AnimatedNative.timing(opacity, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
      AnimatedNative.timing(scale, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPressOut = () => {
    AnimatedNative.parallel([
      AnimatedNative.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      AnimatedNative.timing(scale, {
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
    <AnimatedPressable onPress={press} onPressIn={onPressIn} onPressOut={onPressOut}>
      <AnimatedNative.View style={[animatedStyle, styles.button, styles.elevation]}>
        <View style={styles.labelContainer}>
          <Icon iconName={icon} size="22" color={theme.colors.backdrop} />
          <Paragraph style={styles.textButton}>{text}</Paragraph>
        </View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            stroke="#222233"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
          />
        </Svg>
      </AnimatedNative.View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.peach,
    padding: 10,
    width: Dimensions.get('window').width - 40,
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    marginTop: 10,
  },
  elevation: {
    shadowColor: theme.colors.primary,
    elevation: 1,
  },
  textButton: {
    textTransform: 'uppercase',
    marginLeft: 10,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default TraceButton;
