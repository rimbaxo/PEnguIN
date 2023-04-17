import { NavigationProp } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { Animated as AnimatedNative, Dimensions, StyleSheet, Text, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useTheme } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';

import AnimatedProgressBar from '@/components/AnimatedProgressBar/AnimatedProgressBar';
import ButtonSubmit from '@/components/ButtonSubmit';
import { RootStackParamList } from '@/navigation/StackNavigator/types';

const { width } = Dimensions.get('screen');

const SuccesScreenCBA = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
  const ConfettiComponent = () => (
    <ConfettiCannon
      count={200}
      origin={{ x: -10, y: 0 }}
      colors={[theme.colors.lavander, theme.colors.primary]}
      fallSpeed={2000}
      explosionSpeed={0}
      onAnimationEnd={() => showElements()}
    />
  );

  const opacity = useRef(new AnimatedNative.Value(0)).current;
  const scale = useRef(new AnimatedNative.Value(0.9)).current;

  const display_proceed = useSharedValue('false');

  const showElements = () => {
    AnimatedNative.parallel([
      AnimatedNative.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      display_proceed.value = 'true';
    });
  };

  const animatedStyle = {
    opacity,
    transform: [{ scale }],
  };

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.mainView}>
      <View style={styles.secondView}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Complimenti!</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.textInfo}>Hai gudagnato 30 punti per aver compilato:</Text>
            <Text style={[styles.textInfo, styles.exercise]}>Questionario CBA_VE</Text>
          </View>
          <Text style={[styles.textInfo, styles.progressInfo]}>
            La cintura gialla è sempre più vicina!{' '}
          </Text>
        </View>
        <AnimatedNative.View style={[animatedStyle, styles.barContainer]}>
          <AnimatedProgressBar />
        </AnimatedNative.View>
      </View>

      <AnimatedNative.View style={[animatedStyle, styles.button]}>
        <ButtonSubmit
          display={display_proceed}
          text="Procedi"
          onPress={() => navigation.navigate('Questionari')}
          color={theme.colors.lavander}
          size="large"
        />
      </AnimatedNative.View>
      <ConfettiComponent />
    </View>
  );
};

const createStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: theme.colors.yellow,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    secondView: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: 100,
      //borderWidth: 1,
      //borderColor: "blu",
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 300,
    },
    barContainer: {
      height: 50,
      width,
      justifyContent: 'center',
      marginTop: 30,
      //borderWidth: 1,
      //borderColor: "red",
    },
    text: {
      fontFamily: 'Satoshi',
      padding: 20,
      color: '#EBFDFF',
      fontSize: 14,
    },
    titleContainer: {
      width: Dimensions.get('screen').width,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      color: theme.colors.primary,
      fontSize: 24,
    },
    title: {
      color: theme.colors.primary,
      fontSize: 32,
      fontFamily: 'Satoshi',
      textAlign: 'center',
    },
    infoContainer: {
      width: Dimensions.get('screen').width,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    textInfo: {
      width: Dimensions.get('screen').width,
      color: theme.colors.primary,
      fontSize: 16,
      fontFamily: 'Satoshi',
      textAlign: 'center',
    },
    exercise: {
      fontSize: 24,
      top: 25,
    },
    progressInfo: {
      fontSize: 16,
    },
    button: {
      bottom: 50,
      //borderWidth: 1,
      //borderColor: "red",
    },
  });

export default SuccesScreenCBA;
