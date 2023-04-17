import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react';
import { FieldValues, useFormContext, useFormState } from 'react-hook-form';
import { View, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { Subheading, Text } from 'react-native-paper';

import FormComponent from '@/components/FormStructure/FormComponent';
import Paginator from '@/components/FormStructure/Paginator';
import { Step } from '@/types/formtypes';

type Props<TFormInputs extends FieldValues> = {
  steps: Step<TFormInputs>[];
  navTo: () => void;
  name: string;
  scrollingEnabled?: boolean;
};

function FormList<TFormInputs extends FieldValues>(props: Props<TFormInputs>): React.ReactElement {
  const { steps, navTo, name, scrollingEnabled } = props;

  //console.log(control);

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(name, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const { trigger, control, getValues } = useFormContext<TFormInputs>();

  const { errors } = useFormState<TFormInputs>({ control });

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    setCurrentIndex(viewableItems[0]?.index);
    //console.log(viewableItems);
  }).current;

  const scrollNext = async () => {
    if (slidesRef.current === null) return;

    if (currentIndex < steps.length - 1) {
      if (scrollingEnabled !== undefined) {
        const err = await trigger(steps[currentIndex].name);
        if (!err) return;
      }
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }

    if (currentIndex === steps.length - 1) {
      await trigger();
      const error = steps.some((step, index) => {
        const err = errors.hasOwnProperty(step.name);
        if (err) {
          slidesRef.current?.scrollToIndex({ index });
          return err;
        }
      });
      if (error) return;

      const values = getValues();
      //console.log(values);
      await storeData(values);
      navTo();
    }
  };

  const scrollPrev = () => {
    if (slidesRef.current === null) return;
    if (currentIndex > 0) {
      slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const { width } = Dimensions.get('window');

  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const instructions = () => {
    if (name === 'CBA') {
      if (currentIndex >= 66) {
        return (
          <Subheading style={styles.cbaInstructions}>Negli ultimi 15 giorni, HO AVUTO:</Subheading>
        );
      }
      if (currentIndex >= 40) {
        return (
          <Subheading style={styles.cbaInstructions}>
            Negli ultimi 15 giorni, MI SONO SENTITO:
          </Subheading>
        );
      }
      return (
        <Subheading style={styles.cbaInstructions}>
          Legga le seguenti frasi e per ognuna segni la risposta che meglio descrive come si è
          sentito in questo periodo. Faccia riferimento agli{' '}
          <Text style={{ fontWeight: 'bold' }}>ultimi 15 giorni, compreso oggi</Text>, e scelga la
          sua risposta:
        </Subheading>
      );
    }
    return <></>;
  };

  return (
    <View style={styles.container}>
      <View>{instructions()}</View>
      <View style={styles.listContainer}>
        <FlatList<Step<TFormInputs>>
          data={steps}
          renderItem={({ item }) => <FormComponent item={item} />}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={scrollingEnabled !== undefined ? scrollingEnabled : true}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          initialNumToRender={1}
          maxToRenderPerBatch={5}
          getItemLayout={getItemLayout}
          windowSize={1}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator
        data={steps}
        currentIndex={currentIndex}
        scrollX={scrollX}
        scrollNext={scrollNext}
        scrollPrev={scrollPrev}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  bottomNav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
  },
  placeholder: {
    width: 64,
  },
  cbaInstructions: {
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 5,
  },
});

export default FormList;
