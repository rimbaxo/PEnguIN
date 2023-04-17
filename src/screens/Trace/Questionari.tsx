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

const Questionari = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
  const buttons: button[] = [
    {
      text: 'CBA_VE',
      navTo: () => navigation.navigate('NewCba'),
      icon: 'Book',
    },
    {
      text: 'Questionario 1',
      navTo: () => {},
      icon: 'Book',
    },
    {
      text: 'Questionario 2',
      navTo: () => {},
      icon: 'Book',
    },
    {
      text: 'Questionario 3',
      navTo: () => {},
      icon: 'Book',
    },
    {
      text: 'Questionario 4',
      navTo: () => {},
      icon: 'Book',
    },
    {
      text: 'Questionario 5',
      navTo: () => {},
      icon: 'Book',
    },
    {
      text: 'Questionario 6',
      navTo: () => {},
      icon: 'Book',
    },
    {
      text: 'Questionario 7',
      navTo: () => {},
      icon: 'Book',
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

export default Questionari;
