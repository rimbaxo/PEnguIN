import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import ButtonSubmit from '@/components/ButtonSubmit';
import { conseguentSteps } from '@/screens/ABC_Cognitive/Conseguente';
import { theme } from '@/theme/theme';
import { RootStackScreenProps } from '@/types/navigation';

const paddingTop = 80;

const ConseguenteRecap = () => {
  const [values, setValues] = useState({
    A_whatAfter: '',
    B_what: '',
    C_emotions: '',
    D_intensity: '',
  });

  const navigation = useNavigation<RootStackScreenProps<'ConseguenteRecap'>['navigation']>();
  const display = useSharedValue('true');

  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue) setValues(JSON.parse(jsonValue));
      console.log({ values });
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData('Conseguente');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <LinearGradient
          colors={[
            'rgba( 255, 228, 217, 1 )',
            'rgba( 255, 228, 217, 0.95 )',
            'rgba( 255, 228, 217, 0.85 )',
            'rgba( 255, 228, 217, 0.75 )',
            'rgba( 255, 228, 217, 0.5 )',
            'rgba( 255, 228, 217, 0.3 )',
            'rgba( 255, 228, 217, 0.2 )',
            'rgba( 255, 228, 217, 0.1 )',
            'rgba( 255, 228, 217, 0 )',
          ]}
          style={[styles.pickerGradient, styles.topGradient]}
          pointerEvents="none"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.dataElementContainer}>
          {conseguentSteps.map((item, index) => {
            return (
              <View style={styles.dataElement} key={index}>
                <Text style={styles.title}>{item.title.replace('?', ':')}</Text>
                <Text style={styles.text}>{Object.values(values)[index]} </Text>
              </View>
            );
          })}
        </ScrollView>
        <LinearGradient
          colors={[
            'rgba( 255, 228, 217, 0 )',
            'rgba( 255, 228, 217, 0.1 )',
            'rgba( 255, 228, 217, 0.2 )',
            'rgba( 255, 228, 217, 0.3 )',
            'rgba( 255, 228, 217, 0.5 )',
            'rgba( 255, 228, 217, 0.75 )',
            'rgba( 255, 228, 217, 0.85 )',
            'rgba( 255, 228, 217, 0.95 )',
            'rgba( 255, 228, 217, 1 )',
          ]}
          style={[styles.pickerGradient, styles.bottomGradient]}
          pointerEvents="none"
        />
      </View>
      <View style={styles.btnContainer}>
        <ButtonSubmit
          display={display}
          text="modifica"
          onPress={() => navigation.goBack()}
          color="#f4f4f4"
        />
        <ButtonSubmit
          display={display}
          text="Procedi"
          onPress={() => navigation.navigate('Behaviour')}
          color="#f4f4f4"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.peach,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: theme.colors.primary,
  },
  text: {
    fontSize: 16,
    paddingTop: 2,
    opacity: 0.5,
    color: theme.colors.primary,
  },
  dataElement: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
    paddingBottom: 35,
    paddingRight: 10,
  },
  dataElementContainer: {
    paddingTop,
    //borderWidth: 5,
    paddingHorizontal: 10,
  },
  btn: {
    width: 170,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    //borderWidth: 5,
    borderColor: 'red',
  },
  pickerGradient: {
    position: 'absolute',
    height: paddingTop,
    width: '100%',
  },
  topGradient: {
    top: 0,
    zIndex: 1,
  },
  bottomGradient: {
    bottom: 0,
    zIndex: 1,
  },
  container2: {
    flex: 0.9,
  },
});

export default ConseguenteRecap;
