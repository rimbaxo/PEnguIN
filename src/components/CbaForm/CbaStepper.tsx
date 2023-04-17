import { Send, Next, Previous } from 'iconsax-react-native';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';

import { PropTypes } from './types';

const CbaStepper: FC<PropTypes.CbaStepper> = ({
  steps,
  activeStep,
  handleNext,
  handleBack,
  handleSubmit,
}) => {
  const progress = activeStep / steps;

  return (
    <View style={styles.wrapper}>
      <ProgressBar style={styles.progressBar} progress={progress} />
      <View style={styles.buttonBar}>
        <Button
          mode="contained"
          disabled={activeStep === 0}
          onPress={handleBack}
          icon={({ size, color }) => <Previous size={size} color={color} variant="Bold" />}>
          Indietro
        </Button>
        {activeStep === steps ? (
          <Button
            icon={({ size, color }) => <Send size={size} color={color} variant="Bold" />}
            mode="contained"
            onPress={handleSubmit}
            contentStyle={{ flexDirection: 'row-reverse' }}>
            Invia
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={handleNext}
            contentStyle={{ flexDirection: 'row-reverse' }}
            icon={({ size, color }) => <Next size={size} color={color} variant="Bold" />}>
            {' '}
            Avanti
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  progressBar: {
    marginBottom: 10,
    height: 10,
    borderRadius: 5,
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});

export default CbaStepper;
