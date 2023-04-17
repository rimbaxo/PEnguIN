import { InfoCircle } from 'iconsax-react-native';
import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { View, StyleSheet, Text } from 'react-native';
import { HelperText } from 'react-native-paper';

import SwipePicker from '@/components/FormInputTypes/SwipePicker';
import { ComponentProps } from '@/screens/ABC_Cognitive/Antecedent';
import { theme } from '@/theme/theme';

const min_length = 60;
const hour_length = 24;
const min: number[] = Array(min_length).fill(0);
const hour: number[] = Array(hour_length).fill(0);

export type mintype = {
  value: number;
  label: string;
};

const minutes: mintype[] = min.map((_, index) => {
  return {
    value: index,
    label: index < 10 ? '0' + index.toString() : index.toString(),
  };
});

const hours: mintype[] = hour.map((_, index) => {
  return {
    value: index,
    label: index < 10 ? '0' + index.toString() : index.toString(),
  };
});

const Clock = <TFormInputs extends FieldValues>(props: ComponentProps<TFormInputs>) => {
  const field = props.renderProps.field;
  const fieldState = props.renderProps.fieldState;

  const { onChange, value } = field;
  const { error } = fieldState;
  const isError = error !== undefined;

  const [hoursvalue, setHoursValue] = useState(field.value.split(':')[0]);
  const [minutesvalue, setMinutesValue] = useState(field.value.split(':')[1]);

  /*
  const onTimeChange = ({ index, item }: { index: number; item: mintype }) => {
    const newValue = [item.label, value.split(':')[1]].join(':');
    onChange(newValue);
    //funzione che costruisce il valore da salvare fatto bene sia per hour che per minuti
    // setto a 0 per entrambe e con onchange si cambia minuti o ore. Crea uno stato
    console.log({ value });
  };
   */
  const onTimeChange = () => {
    const newValue = [hoursvalue, minutesvalue].join(':');
    onChange(newValue);
  };

  const selectedHour = (pick: number) => {
    const hour = value.split(':')[pick];
    if (hour.charAt(0) === '0') return Number(hour.charAt(1));
    return Number(hour);
  };

  return (
    <View style={styles.container}>
      <SwipePicker
        items={hours}
        width={80}
        height={200}
        time={setHoursValue}
        onChange={onTimeChange}
        initialSelectedIndex={selectedHour(0)}
      />
      <Text style={styles.doubledots}>:</Text>
      <SwipePicker
        items={minutes}
        width={80}
        height={200}
        time={setMinutesValue}
        onChange={onTimeChange}
        initialSelectedIndex={selectedHour(1)}
      />
      {error && (
        <View style={styles.helperContainer}>
          <InfoCircle size="14" color={theme.colors.error} />
          <HelperText visible={isError} type="error" style={styles.helperText}>
            {error?.message}
          </HelperText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
  },
  cnt: {
    paddingTop: 180,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  elem: {
    borderWidth: 2,
  },
  listItem: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  listItemText: {
    color: theme.colors.primary,
    fontSize: 25,
  },
  doubledots: {
    fontSize: 30,
  },
  helperContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  helperText: {
    fontSize: 12,
    paddingHorizontal: 6,
  },
});

export default Clock;
