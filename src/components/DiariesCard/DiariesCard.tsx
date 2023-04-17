import { FC, useMemo, useRef } from 'react';
import {
  Animated as AnimatedNative,
  StyleSheet,
  ImageBackground,
  View,
  type ImageSourcePropType,
  Pressable,
} from 'react-native';
import { Subheading, useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';

interface Props {
  imageSource: ImageSourcePropType;
  title: string;
  press: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Diaries: FC<Props> = (props) => {
  const { imageSource, title, press } = props;

  const theme = useTheme();
  const styles = useMemo(() => creatStyles(theme), [theme]);

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
      <AnimatedNative.View style={[animatedStyle]}>
        <ImageBackground
          source={imageSource}
          resizeMode="cover"
          style={styles.card}
          imageStyle={styles.image}>
          <View style={styles.overlay} />
          <Subheading>{title}</Subheading>
        </ImageBackground>
      </AnimatedNative.View>
    </AnimatedPressable>
  );
};

const creatStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    card: {
      display: 'flex',
      position: 'relative',
      width: 240,
      height: 150,
      justifyContent: 'flex-end',
      padding: 20,
      marginRight: theme.gaps.gutter,
    },
    image: {
      borderRadius: theme.shapes.radius,
    },
    overlay: {
      width: 240,
      height: 150,
      position: 'absolute',
      inset: 0,
      backgroundColor: theme.colors.lavander,
      borderRadius: theme.shapes.radius,
      opacity: 0.7,
    },
  });

export default Diaries;
