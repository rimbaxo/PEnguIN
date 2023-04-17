import React from 'react';
import { FieldValues } from 'react-hook-form';
import { View, StyleSheet, Dimensions, TextInput } from 'react-native';
import { HelperText } from 'react-native-paper';

import { theme } from '@/theme/theme';
import { ComponentProps } from '@/types/formtypes';

const Textinput = <TFormInputs extends FieldValues>(props: ComponentProps<TFormInputs>) => {
  const {
    field,
    fieldState: { error },
  } = props.renderProps;

  const { onChange, value } = field;
  const color = props.color;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    textInput: {
      borderWidth: 2,
      borderRadius: 50,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
      paddingBottom: 15,
      borderColor: color ? color : '#f4f4f4',
      fontSize: 16,
      //backgroundColor: theme.colors.lavander,
      width: Dimensions.get('window').width - 80,
    },
    errorMessage: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          value={value}
          onChangeText={(text) => {
            onChange(text);
          }}
          multiline
          style={styles.textInput}
          placeholder="Scrivi qui..."
          selectionColor={theme.colors.accent}
        />
      </View>
      <View style={styles.errorMessage}>
        <HelperText type="error" visible={!!error}>
          {error?.message}
        </HelperText>
      </View>
    </View>
  );
};

export default Textinput;
