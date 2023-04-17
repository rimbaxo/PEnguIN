import { Slider } from '@miblanchard/react-native-slider';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';

import { theme } from '@/theme/theme';
import { ComponentProps } from '@/types/formtypes';

const IntensitySlider = <TFormInputs extends FieldValues>(props: ComponentProps<TFormInputs>) => {
  const { field } = props.renderProps;
  const { onChange, value } = field;

  return (
    <View style={styles.container}>
      <Paragraph style={styles.text}>
        Seleziona l'intensità scegliendo fra una scala di valori da 0 a 10, dove a 0 corrisponde il
        livello più basso d'intensità e a 10 quello più alto
      </Paragraph>
      <Slider
        value={value}
        onValueChange={(value) => {
          onChange(value);
        }}
        containerStyle={styles.sliderContainer}
        minimumValue={0}
        maximumValue={10}
        step={1}
        trackStyle={styles.trackStyle}
        thumbStyle={styles.thumbStyle}
        thumbTintColor={theme.colors.primary}
        minimumTrackTintColor={theme.colors.primary}
        trackClickable
      />
      <View style={styles.textIntensity}>
        <Title>Intensità: </Title>
        <Title style={styles.textIntensityValue}>{value}</Title>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  sliderContainer: {
    width: Dimensions.get('window').width - 100,
    height: 50,
  },
  trackStyle: {
    backgroundColor: theme.colors.lavander,
    //borderWidth: 1,
    borderColor: theme.colors.primary,
    height: 6,
    borderRadius: 50,
  },
  thumbStyle: {
    backgroundColor: theme.colors.primary,
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  text: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 30,
  },
  textIntensity: {
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIntensityValue: {
    width: 30,
    textAlign: 'center',
  },
});

export default IntensitySlider;
