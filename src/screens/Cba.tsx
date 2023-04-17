import { StyleSheet, View } from 'react-native';

import CbaForm from '@/components/CbaForm';
import questions from '@/data/questions';

const Cba = () => {
  return (
    <View style={styles.wrapper}>
      <CbaForm questions={questions} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default Cba;
