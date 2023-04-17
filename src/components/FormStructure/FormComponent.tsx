import React from 'react';
import { FieldValues, Controller, useFormContext } from 'react-hook-form';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { Step } from '@/types/formtypes';

interface itemProps<TFormInputs extends FieldValues> {
  item: Step<TFormInputs>;
}

function FormComponent<TFormInputs extends FieldValues>(
  props: itemProps<TFormInputs>
): React.ReactElement {
  const { item } = props;
  const Component: Step<TFormInputs>['component'] = (props) => item.component(props);

  const { control } = useFormContext<TFormInputs>();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> {item.title} </Text>
      </View>
      <View style={styles.componentContainer}>
        <Controller
          control={control}
          name={item.name}
          rules={{
            required: { message: 'Per continuare, deve rispondere alla domanda', value: true },
          }}
          render={(props) => (
            <Component<TFormInputs> renderProps={props} options={item.options} color={item.color} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    //borderWidth: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  componentContainer: {
    //borderWidth: 1,
    width: Dimensions.get('window').width,
    flexGrow: 1,
  },
});

export default FormComponent;
