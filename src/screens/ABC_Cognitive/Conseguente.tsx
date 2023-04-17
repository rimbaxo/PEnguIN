import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import IntensitySlider from '@/components/FormInputTypes/IntensitySlider';
import RadioList from '@/components/FormInputTypes/RadioList';
import Textinput from '@/components/FormInputTypes/Textinput';
import FormList from '@/components/FormStructure/FormList';
import { theme } from '@/theme/theme';
import { FormInputsConseguente, Step } from '@/types/formtypes';
import { RootStackScreenProps } from '@/types/navigation';

export const conseguentSteps: Step<FormInputsConseguente>[] = [
  {
    id: 1,
    title: "Cos'è successo subito dopo?",
    component: Textinput,
    name: 'A_whatAfter',
  },
  {
    id: 2,
    title: 'Che cosa hai fatto?',
    component: Textinput,
    name: 'B_what',
  },
  {
    id: 3,
    title: 'Che emozione hai provato subito dopo?',
    component: RadioList,
    name: 'C_emotions',
    options: [
      'Attesa',
      'Gioia',
      'Accettazione',
      'Paura',
      'Sorpresa',
      'Rabbia',
      'Dolore/Tristezza',
      'Disgusto',
    ],
  },
  {
    id: 4,
    title: "Qual era l'intensità dell'emozione provata?",
    component: IntensitySlider,
    name: 'D_intensity',
  },
];

const Conseguente = () => {
  const navigation = useNavigation<RootStackScreenProps<'Antecedent'>['navigation']>();

  const methods = useForm<FormInputsConseguente>({
    reValidateMode: 'onChange',
    defaultValues: {
      A_whatAfter: '',
      B_what: '',
      C_emotions: '',
      D_intensity: '0',
    },
  });

  const navTo = () => navigation.navigate('ConseguenteRecap');

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <FormList<FormInputsConseguente> steps={conseguentSteps} navTo={navTo} name="Conseguente" />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.peach,
  },
});

export default Conseguente;
