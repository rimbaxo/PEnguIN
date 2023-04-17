import React, { FC } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

import ArrowButton from '@/components/FormStructure/ArrowButton';
import SubmitSectionButton from '@/components/FormStructure/SubmitSectionButton';
import { theme } from '@/theme/theme';

const width = Dimensions.get('window').width;

interface PaginatorProps {
  data: { id: number; title: string }[];
  scrollX: Animated.Value;
  currentIndex: number;
  scrollNext: () => void;
  scrollPrev: () => void;
}

const Paginator: FC<PaginatorProps> = (props) => {
  const { data, scrollX, scrollPrev, scrollNext, currentIndex } = props;

  const scrollPos = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });

  const centerAligment = (width - 168) / 2; // 168 is the width of the arrow buttons plus the margin

  const leftpos = Animated.add(scrollPos, centerAligment);

  return (
    <View style={styles.bottomNav}>
      {currentIndex === 0 ? (
        <View style={styles.placeholder} />
      ) : (
        <ArrowButton scrollTo={scrollPrev} icon="ArrowLeft" />
      )}

      <Animated.View style={[styles.container, { left: leftpos }]}>
        {data.map((_, i) => {
          const inputRange = [
            (i - 3) * width,
            (i - 2) * width,
            (i - 1) * width,
            i * width,
            (i + 1) * width,
            (i + 2) * width,
            (i + 3) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 10, 10, 25, 10, 10, 10],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 0.3, 0.3, 1, 0.3, 0.3, 0],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />
          );
        })}
      </Animated.View>

      {currentIndex === data.length - 1 ? (
        <SubmitSectionButton onClick={scrollNext} />
      ) : (
        <ArrowButton scrollTo={scrollNext} icon="ArrowRight" />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    //borderWidth: 1,
    position: 'relative',
    flex: 1,
    zIndex: -1,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 5,
  },
  bottomNav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
  },
  placeholder: {
    width: 64,
  },
});

export default Paginator;
