import { FC, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TextProps,
  Animated as AnimatedNative,
  ViewProps,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Card, Text, useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import { formatDate, formatMonth, getMarkedDates } from './constants';

import Icon from '@/components/Icon';
import { myCalendarProps } from '@/screens/Trace/ABCCognitive/ABCCognitive';
import { theme } from '@/theme/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface customStyles {
  container?: ViewProps['style'];
  text?: TextProps['style'];
}

const CalendarComponent: FC<myCalendarProps> = ({ data, appointments, setIsMarked, isAgenda }) => {
  //setIsMarked

  const { colors } = useTheme();
  const currentDate = formatDate(new Date());
  const [datePressed, setDatePressed] = useState(currentDate);

  const markedDates = getMarkedDates(appointments, datePressed);

  //giorno attuale giallo scritta
  // giorno selezionato tutto giallo pieno
  // giorno evento puntino sotto

  const setABCDescription = (date: (string & DateData) | undefined) => {
    if (markedDates.hasOwnProperty(date?.dateString!)) {
      setIsMarked(true);
    } else {
      setIsMarked(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Calendar
            current={currentDate}
            style={styles.calendar}
            hideExtraDays
            markingType="custom"
            markedDates={markedDates}
            firstDay={1}
            enableSwipeMonths
            renderArrow={(direction) =>
              direction === 'left' ? (
                <Icon iconName="ArrowLeft" color={colors.background} />
              ) : (
                <Icon iconName="ArrowRight" color={colors.background} />
              )
            }
            dayComponent={({ date, state, marking }) => {
              const opacity = useRef(new AnimatedNative.Value(1)).current;
              const scale = useRef(new AnimatedNative.Value(1)).current;

              const setDate = (param: typeof date) => {
                data.value.day.value = param?.day.toString()!;
                data.value.month.value = formatMonth(Number(param?.month!));
                data.value.year.value = param?.year.toString()!;
              };

              const onPressIn = () => {
                AnimatedNative.parallel([
                  AnimatedNative.timing(opacity, {
                    toValue: 0.75,
                    duration: 150,
                    useNativeDriver: true,
                  }),
                  AnimatedNative.timing(scale, {
                    toValue: 0.75,
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

              const onPress = () => {
                if (isAgenda === undefined) {
                  if (date?.dateString! > currentDate) return;
                  else {
                    setDate(date);
                    setABCDescription(date);
                    setDatePressed(date?.dateString!);
                    return;
                  }
                }
                setDate(date);
                setABCDescription(date);
                setDatePressed(date?.dateString!);
              };

              const animatedStyle = { opacity, transform: [{ scale }] };

              const getStyles = () => {
                let styles: customStyles;

                if (marking?.marked) {
                  styles = { ...marking.customStyles };
                } else {
                  styles = {
                    container: {
                      width: 40,
                      height: 40,
                      borderWidth: 0,
                      borderRadius: 50,
                      borderColor: 'rgba(235, 253, 255, 0.1)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        date?.dateString === datePressed
                          ? theme.colors.lavander
                          : theme.colors.primary,
                    },
                    text: {
                      color:
                        isAgenda === undefined
                          ? date?.dateString === datePressed
                            ? theme.colors.primary
                            : date?.dateString! > currentDate
                            ? `${theme.colors.background}33`
                            : theme.colors.background
                          : date?.dateString === datePressed
                          ? theme.colors.primary
                          : theme.colors.background,
                      textDecorationLine: state === 'today' ? 'underline' : 'none',
                    },
                  };
                }
                return styles;
              };

              const styles = getStyles();

              return (
                <AnimatedPressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
                  <AnimatedNative.View style={[animatedStyle, styles.container]}>
                    <Text style={styles.text}>{date?.day}</Text>
                  </AnimatedNative.View>
                </AnimatedPressable>
              );
            }}
            theme={{
              backgroundColor: colors.primary,
              calendarBackground: colors.primary,

              monthTextColor: colors.background,
              textMonthFontFamily: 'Satoshi',
              textDayHeaderFontFamily: 'Satoshi',
              textMonthFontSize: 24,
              textDayFontFamily: 'Satoshi',

              /*
                            dotStyle: {
                                display: "none"
                            },*/

              arrowColor: colors.background,
              textDayHeaderFontSize: 12,

              // @ts-ignore
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 25,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  opacity: 0.8,
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(235, 253, 255, 0.35)',
                },
              },
            }}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 4,
  },

  calendar: {
    backgroundColor: theme.colors.primary,
  },
  card: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0,.1)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0, //default is 1
    shadowRadius: 0, //default is 1
  },
});

export default CalendarComponent;
