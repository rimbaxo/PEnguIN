import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import DiariesCard from '@/components/DiariesCard';
import Event from '@/components/Event';
import Section from '@/components/Section';
import mockEvents from '@/data/events';

const Home = () => {
  const [events, setEvents] = useState<typeof mockEvents | null>(null);

  const navigation = useNavigation();

  const DIARIES = [
    {
      imageSource: require('@/assets/images/brown-wooden-blocks-with-number.jpg'),
      title: 'ABC Cognitivo',
      press: () => navigation.navigate('ABCCognitive'),
    },
    {
      imageSource: require('@/assets/images/pasta-dish-on-brown-plate.jpg'),
      title: 'Diario alimentare',
      press: () => {},
    },

    {
      imageSource: require('@/assets/images/red-apple-fruit-on-four-pyle-books.jpg'),
      title: 'ABC Comportamentale',
      press: () => {},
    },
    {
      imageSource: require('@/assets/images/woman-walking-on-pathway-during-daytime.jpg'),
      title: 'Diario della salute',
      press: () => {},
    },
  ];

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  const theme = useTheme();
  const styles = useMemo(() => creatStyles(theme), [theme]);

  const today =
    format(new Date(), 'eeee, d MMMM', { locale: it }).charAt(0).toUpperCase() +
    format(new Date(), 'eeee, d MMMM', { locale: it }).slice(1);

  return (
    <View style={styles.container}>
      <Section title={today} action={{ label: "vai all'agenda", to: 'Agenda' }}>
        <FlatList data={events} renderItem={({ item }) => <Event {...item} />} />
      </Section>
      <Section title="I miei diari" action={{ label: 'vai ai diari', to: 'Trace' }}>
        <FlatList
          data={DIARIES}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollViewDiariesList}
          renderItem={({ item }) => <DiariesCard {...item} />}
        />
      </Section>
    </View>
  );
};

const creatStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.gaps.containerPaddingHorizontal,
      justifyContent: 'space-between',
    },
    card: {
      marginVertical: 4,
    },
    scrollViewDiariesList: {
      gap: 4,
      flexDirection: 'row',
    },
    surface: {
      borderRadius: 8,
      marginRight: 8,
      height: 160,
      width: 160,
      elevation: 2,
      overflow: 'hidden',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      padding: 8,
      color: 'white',
      textAlign: 'center',
      backgroundColor: '#000000c0',
    },
  });

export default Home;
