import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import Clock from '@/components/FormInputTypes/Clock';
import RadioList from '@/components/FormInputTypes/RadioList';
import Textinput from '@/components/FormInputTypes/Textinput';
import FormList from '@/components/FormStructure/FormList';
import { theme } from '@/theme/theme';
import { FormInputs, Step } from '@/types/formtypes';
import { RootStackScreenProps } from '@/types/navigation';

export const antecedentSteps: Step<FormInputs>[] = [
  {
    id: 1,
    title: 'Che ore erano?',
    component: Clock,
    name: 'A_time',
  },
  {
    id: 2,
    title: "Dov'eri?",
    component: RadioList,
    name: 'B_where',
    options: [
      'Casa',
      'Scuola',
      'Lavoro',
      'Parco',
      'Casa di amici',
      'Casa del mio partner',
      'Bar',
      'Ristorante',
      'In giro per la città',
      'Ad allenamento',
    ],
  },
  {
    id: 3,
    title: 'Con chi eri?',
    component: Textinput,
    name: 'C_withWho',
  },
  {
    id: 4,
    title: 'Che cosa stavi facendo?',
    component: Textinput,
    name: 'D_what',
  },
  {
    id: 5,
    title: "Cos'è accaduto?",
    component: Textinput,
    name: 'E_whatsUp',
  },
];

const Antecedent = () => {
  const navigation = useNavigation<RootStackScreenProps<'Antecedent'>['navigation']>();

  const methods = useForm<FormInputs>({
    reValidateMode: 'onChange',
    defaultValues: {
      A_time: '00:00',
      B_where: '',
      C_withWho: '',
      D_what: '',
      E_whatsUp: '',
    },
  });

  const navTo = () => navigation.navigate('AntecedentRecap');

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <FormList<FormInputs> steps={antecedentSteps} navTo={navTo} name="Antecedent" />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.lavander,
  },
});

export default Antecedent;
