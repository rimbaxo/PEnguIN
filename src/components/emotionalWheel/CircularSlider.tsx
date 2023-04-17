import React, { useRef } from 'react';
import { View, StyleSheet, Animated as AnimatedNative } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { polar2Canvas, ReText } from 'react-native-redash';
import Svg from 'react-native-svg';

import Gesture from './Gesture';
import MyPath from './MyPath';
import Quadrant from './Quadrant';
import { SIZE, R, CENTER } from './constants';

import ButtonSubmit from '@/components/ButtonSubmit/ButtonSubmit';
import { theme } from '@/theme/theme';

//const AnimatedPath = Animated.createAnimatedComponent(Path);

// Shared value, valori condivisi che possono essere modificati nel corso del tempo. utili per disegnare
// https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/shared-values
interface CircularProps {
  start: Animated.SharedValue<number>;
  nav: () => void;
}

const CircularSlider = ({ start, nav }: CircularProps) => {
  // coordinates for the arc

  // This hook allows for creating shared value reference that can change in response to
  // updating of one or more other shared values.

  // The hook returns a reference to a shared value initialized with the provided data.
  // The reference is an object with .value property, that can be accessed and modified from worklets,
  // but also updated directly from the main JS thread
  const startPos = useDerivedValue(() => polar2Canvas({ theta: start.value, radius: R }, CENTER));

  const title = useSharedValue('');
  const description = useSharedValue('');
  const display = useSharedValue('false');

  const opacity = useRef(new AnimatedNative.Value(0)).current;

  const showText = () => {
    opacity.setValue(0);

    AnimatedNative.parallel([
      AnimatedNative.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useAnimatedReaction(
    () => {
      return title.value;
    },
    (result) => {
      if (result !== '') {
        runOnJS(showText)();
      }
    },
    [title.value]
  );

  const animatedStyle = {
    opacity,
  };

  return (
    <View style={styles.mainBox}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 250 250">
        <Quadrant />
        <MyPath pos={startPos} />
        <Gesture
          start={start}
          startPos={startPos}
          title={title}
          description={description}
          display={display}
        />
      </Svg>
      <AnimatedNative.View style={[animatedStyle, styles.textContainer]}>
        <ReText style={styles.text} text={title} />
        <ReText style={styles.emotionText} text={description} multiline />
      </AnimatedNative.View>
      <ButtonSubmit
        display={display}
        onPress={nav}
        text="Conferma"
        color={theme.colors.palepink}
        size="large"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 40,
    width: 200,
    height: 66,
    padding: 10,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
    flexGrow: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Satoshi',
    textTransform: 'uppercase',
  },
  elevation: {
    shadowColor: theme.colors.primary,
    elevation: 2,
  },
  emotionText: {
    fontSize: 16,
    fontFamily: 'Satoshi',
    marginLeft: 20,
    marginRight: 10,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 25,
    display: 'flex',
    alignItems: 'center',
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
});

export default CircularSlider;
