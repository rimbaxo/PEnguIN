import { add, sub } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, FlatList } from 'react-native';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import CalendarComponent from '@/components/ABCCalendar/CalendarComponent';
import { formatMonth } from '@/components/ABCCalendar/constants';
import Event from '@/components/Event';
import Icon from '@/components/Icon';
import mockEvents from '@/data/events';
import SvgCurve2 from '@/navigation/StackNavigator/SvgCurve2';
import { dateSelected } from '@/screens/Trace/ABCCognitive/ABCCognitive';
import { theme } from '@/theme/theme';

const currentDate = new Date();
const month = currentDate.getMonth() + 1;

const sentences = [
  'Nessun evento in programma',
  'Ecco gli eventi in programma per il giorno selezionato',
];

const appointments = [
  add(new Date(), { days: 1 }),
  sub(new Date(), { days: 2 }),
  sub(new Date(), { days: 5 }),
];

const Agenda = () => {
  const [isMarked, setIsMarked] = useState(false);
  const sentence = isMarked ? sentences[1] : sentences[0];

  const [events, setEvents] = useState<typeof mockEvents | null>(null);

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  useEffect(() => {
    if (appointments.indexOf(currentDate) === -1) return;
    setIsMarked(true);
  }, []);

  const dateSelected: SharedValue<dateSelected> = useSharedValue({
    day: useSharedValue(currentDate.getDate().toString()),
    month: useSharedValue(formatMonth(month)),
    year: useSharedValue(currentDate.getFullYear().toString()),
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.calendarContainer}>
        <CalendarComponent
          data={dateSelected}
          appointments={appointments}
          setIsMarked={setIsMarked}
          isAgenda
        />
      </View>
      <View style={styles.svgCurveContainer}>
        <SvgCurve2 color={theme.colors.primary} style={styles.svgCurve} />
      </View>

      <View style={styles.DescContainer}>
        <View style={styles.textContainer}>
          <View style={styles.dateTextContainer}>
            <Icon iconName="Calendar" size="24" color={theme.colors.primary} />
            <ReText style={[styles.dateText, styles.dateTextDay]} text={dateSelected.value.day} />
            <ReText style={styles.dateText} text={dateSelected.value.month} />
            <ReText style={styles.dateText} text={dateSelected.value.year} />
          </View>
        </View>
      </View>
      <View style={styles.eventContainer}>
        {isMarked ? (
          <FlatList
            data={events}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: 2 }}
            renderItem={({ item }) => <Event {...item} />}
          />
        ) : (
          <Text> Inserisci un evento </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    borderColor: 'blue',
    //borderWidth: 10,
  },
  calendarContainer: {
    backgroundColor: theme.colors.primary,
    width: Dimensions.get('window').width,
    height: 475,
  },
  text: {
    fontSize: 14,
    color: theme.colors.primary,
    fontFamily: 'Satoshi',
  },
  content: {
    padding: 4,
  },
  calendar: {
    marginBottom: 10,
  },
  svgCurve: {
    width: Dimensions.get('window').width,
  },
  svgCurveContainer: {
    width: Dimensions.get('window').width,
    //borderWidth: 2,
    height: 50,
    borderColor: 'red',
    top: -15,
  },
  DescContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    //borderWidth: 2,
    top: -15,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    //borderWidth: 2,
    borderColor: 'red',
    paddingHorizontal: 10,
  },
  textParagraphContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 3,
  },
  dateTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  eventContainer: {
    width: Dimensions.get('window').width,
    //borderWidth: 5,
    borderColor: 'yellow',
    paddingHorizontal: 10,
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    marginLeft: 10,
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontFamily: 'Satoshi',
  },
  dateTextDay: {
    marginLeft: 5,
    width: 22,
  },
});

export default Agenda;

/*

        LocaleConfig.locales['it'] = {
        monthNames: [
        'Gennaio',
        'Febbraio',
        'Marzo',
        'Aprile',
        'Maggio',
        'Giugno',
        'Luglio',
        'Agosto',
        'Settmebre',
        'Ottobre',
        'Novembre',
        'Dicembre',
        ],
        monthNamesShort: [
        'Ge.',
        'Feb',
        'Mar',
        'Apr',
        'Mag',
        'Giu',
        'Lug',
        'Ago',
        'Set',
        'Ott',
        'Nov',
        'Dic',
        ],
        dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
        today: 'Oggi',
      };
        LocaleConfig.defaultLocale = 'it';

        const formatDate = (date = new Date()) => format(date, 'yyyy-MM-dd');
        const getMarkedDates = (baseDate: string, appointments: { date: Date; title: string }[]) => {

        const markedDates: {
        [key: string]: { selected?: boolean; selectedColor?: string; marked?: boolean };
      } = {};

        markedDates[baseDate] = { selected: true };

        appointments.forEach((appointment) => {
        const formattedDate = formatDate(new Date(appointment.date));
        markedDates[formattedDate] = {
        ...markedDates[formattedDate],
        marked: true,
      };
      });

        return markedDates;
      };

const { colors } = useTheme();
  const currentDate = formatDate(new Date());

  const appointments = [
    {
      date: sub(new Date(), { days: 1 }),
      title: "It's a past thing!",
    },
    {
      date: new Date(),
      title: "It's a today thing!",
    },
    {
      date: add(new Date(), { days: 2 }),
      title: "It's a future thing!",
    },
  ];

  const markedDates = getMarkedDates(currentDate, appointments);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text>Riepilogo eventi</Text>
      <Card>
        <Card.Content>
          <Calendar
            current={currentDate}
            style={styles.calendar}
            onDayPress={(day) => {
              console.log('selected day', day);
            }}
            hideExtraDays
            markedDates={markedDates}
            firstDay={1}
            theme={{
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: colors.accent,
              selectedDotColor: colors.accent,
              dotColor: colors.accent,
            }}
          />
        </Card.Content>
      </Card>
      <Text>Oggi in programma</Text>
      <Card>
        <Card.Content>
          <View>
            <Text>Evento 1</Text>
            <Text>Evento 2</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

* */
