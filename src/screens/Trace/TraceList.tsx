import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import DiariesButton from './DiariesButton';

import { RootStackParamList } from '@/navigation/StackNavigator/types';
import TraceButton from '@/screens/Trace/TraceButton';
import { theme } from '@/theme/theme';

type button = {
  text: string;
  navTo: () => void;
  icon: IconName;
};

type Diaries = {
  text: string;
  navTo: () => void;
  img: string;
};

const TraceList = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
  const buttons: button[] = [
    {
      text: 'Emozioni',
      navTo: () => navigation.navigate('EmotionExercises'),
      icon: 'Heart',
    },
    {
      text: 'Questionari',
      navTo: () => navigation.navigate('Questionari'),
      icon: 'Book',
    },
    {
      text: 'Abilità Cognitive',
      navTo: () => {},
      icon: 'ColorSwatch',
    },
  ];

  const diaries: Diaries[] = [
    {
      text: 'Diario Alimentare',
      navTo: () => {},
      img: require('@/assets/images/pasta-dish-on-brown-plate.jpg'),
    },
    {
      text: 'Diario della salute',
      navTo: () => {},
      img: require('@/assets/images/woman-walking-on-pathway-during-daytime.jpg'),
    },
    {
      text: 'Diario comportamentale',
      navTo: () => {},
      img: require('@/assets/images/red-apple-fruit-on-four-pyle-books.jpg'),
    },
    {
      text: 'Diario cognitivo',
      navTo: () => navigation.navigate('ABCCognitive'),
      img: require('@/assets/images/brown-wooden-blocks-with-number.jpg'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Diari</Text>
      </View>
      <View style={styles.diariesContainer}>
        <FlatList
          data={diaries}
          renderItem={({ item }) => (
            <DiariesButton text={item.text} press={item.navTo} img={item.img} />
          )}
          keyExtractor={(item) => item.text}
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Esercizi e questionari</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map(({ text, navTo, icon }) => {
          return <TraceButton key={text} text={text} press={navTo} icon={icon} />;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Satoshi',
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  titleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0, 0.2)',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingBottom: 35,
  },
  diariesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: -10,
    marginBottom: 50,
  },
});

export default TraceList;
