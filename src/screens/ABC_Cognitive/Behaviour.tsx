import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import Textinput from '@/components/FormInputTypes/Textinput';
import FormList from '@/components/FormStructure/FormList';
import { theme } from '@/theme/theme';
import { FormInputsBehaviour, Step } from '@/types/formtypes';
import { RootStackScreenProps } from '@/types/navigation';

export const behaviourSteps: Step<FormInputsBehaviour>[] = [
  {
    id: 1,
    title: 'Cosa ti è passato per la mente?',
    component: Textinput,
    name: 'A_what',
    color: theme.colors.primary,
  },
];

const Behaviour = () => {
  const navigation = useNavigation<RootStackScreenProps<'Behaviour'>['navigation']>();

  const methods = useForm<FormInputsBehaviour>({
    reValidateMode: 'onChange',
    defaultValues: {
      A_what: '',
    },
  });

  const navTo = () => navigation.navigate('BehaviourRecap');

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <FormList<FormInputsBehaviour> steps={behaviourSteps} navTo={navTo} name="Behaviour" />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
});

export default Behaviour;
