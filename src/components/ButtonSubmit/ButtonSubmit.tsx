import React, { useRef } from 'react';
import { Animated as AnimatedNative, Pressable, StyleSheet, Text } from 'react-native';
import Animated, { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

import { PropTypes } from '@/components/ButtonSubmit/types';
import { theme } from '@/theme/theme';

Animated.addWhitelistedNativeProps({ display: true });

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ButtonSubmit = (props: PropTypes) => {
  const { display, text, onPress, color, size } = { ...props }; // i 3 punti probabilmente si possono togliere

  const padding = size ? (size === 'small' ? 25 : size === 'large' ? 60 : 40) : 40;
  const fontSize = size ? (size === 'small' ? 14 : size === 'large' ? 20 : 16) : 16;

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: padding,
      paddingVertical: padding / 3,
      borderRadius: 50,
      //width: 225,
      //height: 60,
      backgroundColor: color,
      position: 'relative',
      marginBottom: 20,
    },
    text: {
      fontSize,
      fontFamily: 'Satoshi',
      textTransform: 'uppercase',
    },
    elevation: {
      shadowColor: theme.colors.primary,
      elevation: 1,
    },
  });

  const opacity = useRef(new AnimatedNative.Value(0)).current;
  const scale = useRef(new AnimatedNative.Value(1)).current;

  const showButton = () => {
    AnimatedNative.parallel([
      AnimatedNative.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      AnimatedNative.timing(scale, {
        toValue: 1.025,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useAnimatedReaction(
    () => {
      return display.value;
    },
    (result) => {
      if (result === 'true') {
        runOnJS(showButton)();
      }
    },
    []
  );

  const onPressIn = () => {
    if (display.value === 'true') {
      AnimatedNative.parallel([
        AnimatedNative.timing(opacity, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        AnimatedNative.timing(scale, {
          toValue: 0.925,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const onPressOut = () => {
    if (display.value === 'true') {
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
    }
  };

  const animatedStyle = {
    opacity,
    transform: [{ scale }],
  };

  const onPressDecisor = () => {
    if (display.value === 'true') {
      return onPress();
    }
  };

  return (
    <AnimatedPressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPressDecisor}>
      <AnimatedNative.View style={[animatedStyle, styles.elevation, styles.button]}>
        <Text style={styles.text}>{text}</Text>
      </AnimatedNative.View>
    </AnimatedPressable>
  );
};

export default ButtonSubmit;

/*
const mySetTimeout = (val: boolean) => {
    setTimeout(() => {
        setBounce(val);
    }, 50)
}

useAnimatedReaction(
    () => {
    return display.value;
}, (result) => {
    if (result === "true") {
        runOnJS(mySetTimeout)(true);
        }
}, []);


useEffect(() => {
    AnimatedNative.timing(scale, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
    }).start(() => {
        AnimatedNative.timing(scale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start()
    })
},[bounce]);*/

/*
   const animatedStyleDisplay = useAnimatedStyle(() => {
       return {
           //display: display.value === "false" ? "none" : "flex",
           //opacity: display.value === "false" ? 0 : 0,
       }
   });*/
