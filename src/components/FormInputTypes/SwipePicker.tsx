import { LinearGradient } from 'expo-linear-gradient';
import React, { FC, useRef } from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';

import { mintype } from '@/components/FormInputTypes/Clock';

const ListItem = ({ label, style }: { label: string; style: any }) => (
  <View style={style}>
    <Text style={styles.labelsize}>{label}</Text>
  </View>
);

/**
 *
 * @param {Object} props
 * @param {Array} props.items
 * @param {Function} props.onChange
 * @param {Number} [props.initialSelectedIndex]
 * @param {Number} [props.width]
 * @param {Number} [props.height]
 */

export interface SwipePickerProps {
  items: mintype[];
  width: number;
  height: number;
  time: React.Dispatch<React.SetStateAction<string>>;
  initialSelectedIndex?: number | null | undefined;
  onChange: () => void;

  //onChange: ({ index, item }: { index: number; item: mintype }) => void;
}

const SwipePicker: FC<SwipePickerProps> = (props) => {
  const { items, width, height, onChange, initialSelectedIndex, time } = props;
  let itemHeight = 40;
  let listHeight = 200;

  if (height) {
    listHeight = height;
    itemHeight = listHeight / 5;
  }

  const styles = StyleSheet.create({
    list: {
      height: listHeight,
      width,
    },
    listItem: {
      height: itemHeight,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      //borderWidth: 1,
    },
    pickerGradient: {
      position: 'absolute',
      height: 2 * itemHeight,
      width: '100%',
    },
    topGradient: {
      top: 0,
      borderBottomWidth: 1,
    },
    bottomGradient: {
      borderTopWidth: 1,
      bottom: 0,
    },
  });

  const flatList = useRef(null);

  const extendedItems = [
    {
      value: -11,
      label: '',
    },
    {
      value: -12,
      label: '',
    },
    ...items,
    {
      value: -21,
      label: '',
    },
    {
      value: -22,
      label: '',
    },
  ];

  return (
    <View style={styles.list}>
      <FlatList
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
          time(items[index].label);
          onChange();
          //onChange({ index, item: items[index] });
        }}
        initialScrollIndex={initialSelectedIndex}
        ref={flatList}
        data={extendedItems.map((item) => ({
          key: item.value.toString(),
          ...item,
        }))}
        renderItem={(item) => <ListItem label={item.item.label} style={styles.listItem} />}
        getItemLayout={(_, index) => ({ length: itemHeight, offset: index * itemHeight, index })}
        snapToInterval={itemHeight}
        ListEmptyComponent={() => <Text>No Items</Text>}
        showsVerticalScrollIndicator={false}
      />
      <LinearGradient
        colors={[
          'rgba( 200, 216, 244, 1 )',
          'rgba( 200, 216, 244, 0.95 )',
          'rgba( 200, 216, 244, 0.85 )',
          'rgba( 200, 216, 244, 0.75 )',
          'rgba( 200, 216, 244, 0.5 )',
        ]}
        style={[styles.pickerGradient, styles.topGradient]}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[
          'rgba( 200, 216, 244, 0.5 )',
          'rgba( 200, 216, 244, 0.75 )',
          'rgba( 200, 216, 244, 0.85 )',
          'rgba( 200, 216, 244, 0.95 )',
          'rgba( 200, 216, 244, 1 )',
        ]}
        style={[styles.pickerGradient, styles.bottomGradient]}
        pointerEvents="none"
      />
    </View>
  );
};

/*
SwipePicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  initialSelectedIndex: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};*/

const styles = StyleSheet.create({
  labelsize: {
    fontSize: 24,
  },
});

export default SwipePicker;

/*import React from 'react';
import { Animated, StyleSheet } from 'react-native';

const ClockMinutes = (props) => {
  const { data, height, currentIndex } = props;

  const inputRange = [
    (currentIndex - 3) * height,
    (currentIndex - 2) * height,
    (currentIndex - 1) * height,
    currentIndex * height,
    (currentIndex + 1) * height,
    (currentIndex + 2) * height,
    (currentIndex + 3) * height,
  ];

  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: [0, 0.3, 0.66, 1, 0.66, 0.3, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.elem]}>
      <Animated.Text style={[styles.text, { opacity }]}>{item.value}</Animated.Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  minlist: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 200,
    width: 50,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  elem: {
    borderWidth: 2,
  },
});

 onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
              onChange({ index, item: items[index] });
          }}

export default ClockMinutes;*/
