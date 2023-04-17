import React, { FC, useRef } from 'react';
import {
  Animated as AnimatedNative,
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Paragraph } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import { theme } from '@/theme/theme';

interface Props {
  text: string;
  press: () => void;
  img: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DiariesButton: FC<Props> = (props) => {
  const { press, text, img } = props;

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
        <ImageBackground
          source={img}
          style={styles.image}
          resizeMode="cover"
          imageStyle={{ borderRadius: theme.shapes.radius }}>
          <View style={styles.overlay} />
          <Paragraph>{text}</Paragraph>
        </ImageBackground>
      </AnimatedNative.View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 30,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  overlay: {
    width: Dimensions.get('window').width / 2 - 30,
    height: 100,
    position: 'absolute',
    inset: 0,
    backgroundColor: theme.colors.lavander,
    borderRadius: theme.shapes.radius,
    opacity: 0.7,
  },
  elevation: {},
  image: {
    width: Dimensions.get('window').width / 2 - 30,
    height: 100,
    display: 'flex',
    position: 'relative',
    padding: 10,
  },
});

export default DiariesButton;
