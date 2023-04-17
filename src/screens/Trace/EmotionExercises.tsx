import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { RootStackParamList } from '@/navigation/StackNavigator/types';
import TraceButton from '@/screens/Trace/TraceButton';

type button = {
  text: string;
  navTo: () => void;
  icon: IconName;
};

const EmotionExercises = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
  const buttons: button[] = [
    {
      text: 'Ruota delle emozioni',
      navTo: () => navigation.navigate('EmotionWheel'),
      icon: 'Heart',
    },
    {
      text: 'Compito 1',
      navTo: () => {},
      icon: 'Heart',
    },
    {
      text: 'Compito 2',
      navTo: () => {},
      icon: 'Heart',
    },
    {
      text: 'Compito 3',
      navTo: () => {},
      icon: 'Heart',
    },
    {
      text: 'Compito 4',
      navTo: () => {},
      icon: 'Heart',
    },
    {
      text: 'Compito 5',
      navTo: () => {},
      icon: 'Heart',
    },
    {
      text: 'Compito 6',
      navTo: () => {},
      icon: 'Heart',
    },
    {
      text: 'Compito 7',
      navTo: () => {},
      icon: 'Heart',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {buttons.map(({ text, navTo, icon }) => {
          return <TraceButton key={text} text={text} press={navTo} icon={icon} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

export default EmotionExercises;
