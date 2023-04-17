import React from 'react';
import { FieldValues } from 'react-hook-form';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { HelperText, RadioButton, Text } from 'react-native-paper';

import { ComponentProps } from '@/types/formtypes';

const RadioList = <TFormInputs extends FieldValues>(props: ComponentProps<TFormInputs>) => {
  const {
    field,
    fieldState: { error },
  } = props.renderProps;

  const { onChange, value } = field;
  const { options } = props;

  if (!options) return <Text>Loading...</Text>; // non entra mai qui

  return (
    <View style={styles.container}>
      <View style={styles.radioContainer}>
        <RadioButton.Group
          onValueChange={(newValue) => {
            onChange(newValue);
          }}
          value={value}>
          {options &&
            options.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  delayPressIn={0}
                  key={index}
                  style={styles.radiobuttonitem}>
                  <View>
                    <RadioButton value={item} />
                    <Text style={styles.text}>{item}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
        </RadioButton.Group>
      </View>
      <View style={styles.errorMessage}>
        <HelperText type="error" visible={!!error}>
          {error?.message}
        </HelperText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 100,
    flex: 1,
  },
  radiobuttonitem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    zIndex: 1,
    paddingTop: 5,
  },
  text: {
    fontSize: 16,
    position: 'absolute',
    top: 7,
    zIndex: -1,
    left: 40,
  },
  errorMessage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RadioList;
