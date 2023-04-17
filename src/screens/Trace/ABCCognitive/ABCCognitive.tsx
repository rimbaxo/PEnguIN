import { sub } from 'date-fns';
import React, { useEffect, useState, FC } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { SharedValue, useSharedValue } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import ABCbutton from '@/components/ABCCalendar/ABCbutton';
import CalendarComponent from '@/components/ABCCalendar/CalendarComponent';
import { formatMonth } from '@/components/ABCCalendar/constants';
import Icon from '@/components/Icon';
import SvgCurve2 from '@/navigation/StackNavigator/SvgCurve2';
import { theme } from '@/theme/theme';
import { RootStackScreenProps } from '@/types/navigation';

export type dateSelected = {
  day: SharedValue<string>;
  month: SharedValue<string>;
  year: SharedValue<string>;
  //markedDates: SharedValue<MarkedDates>
};

export interface myCalendarProps {
  data: Animated.SharedValue<dateSelected>;
  //setIsMarked: (val: boolean) => void
  appointments: Date[];
  setIsMarked: React.Dispatch<React.SetStateAction<boolean>>;
  isAgenda?: boolean;
}

const currentDate = new Date();
const month = currentDate.getMonth() + 1;

const sentences = [
  'Nessun ABC cognitivo inserito',
  'ABC cognitivo inserito per il giorno corrente',
  'Inserisci ABC cognitivo',
  'Visualizza ABC cognitivo',
];

const appointments = [
  sub(new Date(), { days: 1 }),
  sub(new Date(), { days: 20 }),
  sub(new Date(), { days: 5 }),
];

type Props = RootStackScreenProps<'ABCCognitive'>;

const ABCCognitive: FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  const [isMarked, setIsMarked] = useState(false);

  const sentence = isMarked ? sentences[1] : sentences[0];
  const sentence_button = isMarked ? sentences[3] : sentences[2];

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
        />
      </View>

      <View style={styles.curveContainer}>
        <SvgCurve2 color={theme.colors.primary} style={styles.svgCurve} />
      </View>

      <View style={styles.DescContainer}>
        <View style={styles.textContainer}>
          <View style={styles.dateTextContainer}>
            <Icon iconName="Calendar" size="24" color={theme.colors.primary} style={styles.icon} />
            <ReText style={[styles.dateText, styles.dateTextDay]} text={dateSelected.value.day} />
            <ReText style={styles.dateText} text={dateSelected.value.month} />
            <ReText style={styles.dateText} text={dateSelected.value.year} />
          </View>
          <View style={styles.textParagraphContainer}>
            <Text style={styles.text}>{sentence}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <ABCbutton
              text={sentence_button}
              press={() =>
                isMarked
                  ? navigation.navigate('ABCFormComplete')
                  : navigation.navigate('Antecedent')
              }
              icon={isMarked ? 'Book' : 'Add'}
              color={isMarked ? theme.colors.yellow : theme.colors.lavander}
            />
          </View>
        </View>
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
  },
  DescContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexGrow: 1,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textParagraphContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    top: 10,
  },
  dateTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
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
  text: {
    fontSize: 14,
    color: theme.colors.primary,
    fontFamily: 'Satoshi',
  },
  icon: {},
  calendarContainer: {
    backgroundColor: theme.colors.primary,
    width: Dimensions.get('window').width,
    height: 475,
  },
  curveContainer: {
    width: Dimensions.get('window').width,
  },
  svgCurve: {
    width: Dimensions.get('window').width,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    top: 30,
  },
});

export default ABCCognitive;
