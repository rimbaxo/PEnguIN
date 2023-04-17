import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import CircularSlider from '@/components/emotionalWheel/CircularSlider';
import { RootStackParamList } from '@/navigation/StackNavigator/types';
import { theme } from '@/theme/theme';

type navButton = {
  nav: () => void;
};

//^2.10.0

const EmotionWheel = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
  const { width } = useWindowDimensions();
  const start = useSharedValue(Math.PI / 2);

  const nav: navButton = {
    nav: () => navigation.navigate('SuccesScreen'),
  };

  return (
    <View style={[styles.container, { width }]}>
      <CircularSlider start={start} nav={nav.nav} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});

export default EmotionWheel;
