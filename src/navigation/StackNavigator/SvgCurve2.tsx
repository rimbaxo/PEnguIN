import { FC } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { SvgCurveProps } from './types';

const SvgCurve2: FC<SvgCurveProps> = ({ style, color }) => {
  const width = Dimensions.get('window').width;
  const adjustedHeight = Math.ceil(width / (1440 / 320));
  return (
    <View style={[StyleSheet.absoluteFill, style]}>
      <Svg
        height={adjustedHeight}
        width={width}
        viewBox="0 0 1440 320"
        style={{ position: 'absolute', top: -2}}>
        <Path
          fill={color}
          d="M0,128L120,122.7C240,117,480,107,720,122.7C960,139,1200,181,1320,202.7L1440,224L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        />
      </Svg>
    </View>
  );
};

export default SvgCurve2;
