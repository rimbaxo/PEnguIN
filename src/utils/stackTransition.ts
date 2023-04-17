import {
  StackNavigationOptions,
  StackHeaderInterpolationProps,
  StackCardInterpolationProps,
} from '@react-navigation/stack';
import { Animated } from 'react-native';

const { multiply, add } = Animated;

function forFade({ current, next }: StackHeaderInterpolationProps) {
  const progress = add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0
  );

  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1, 1.9, 2],
        outputRange: [0, 1, 1, 0],
      }),
    },
  };
}

function slideFrom({
  current,
  next,
  inverted,
  layouts: { screen },
  fromRight = true,
}: StackCardInterpolationProps & { fromRight?: boolean }) {
  const translateFocused = multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [fromRight ? screen.width : -screen.width, 0],
      extrapolate: 'clamp',
    }),
    inverted
  );

  const translateUnfocused = next
    ? multiply(
        next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, fromRight ? screen.width * -0.3 : screen.width * 0.3],
          extrapolate: 'clamp',
        }),
        inverted
      )
    : 0;

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.07],
    extrapolate: 'clamp',
  });

  const shadowOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: 'clamp',
  });

  return {
    cardStyle: {
      transform: [
        // Translation for the animation of the current card
        { translateX: translateFocused },
        // Translation for the animation of the card on top of this
        { translateX: translateUnfocused },
      ],
    },
    overlayStyle: { opacity: overlayOpacity },
    shadowStyle: { shadowOpacity },
  };
}

/**
 * Exact values from UINavigationController's animation configuration.
 */
const transitionSpec: StackNavigationOptions['transitionSpec'] = {
  open: {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  },
  close: {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  },
};

const slideFromRight: StackNavigationOptions = {
  gestureDirection: 'horizontal',
  transitionSpec,
  cardStyleInterpolator: (props) => slideFrom({ ...props }),
  headerStyleInterpolator: forFade,
};

const slideFromLeft: StackNavigationOptions = {
  gestureDirection: 'horizontal',
  transitionSpec,
  cardStyleInterpolator: (props) => slideFrom({ ...props, fromRight: false }),
  headerStyleInterpolator: forFade,
};

export { slideFromRight, slideFromLeft };
