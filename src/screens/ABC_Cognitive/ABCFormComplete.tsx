import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ABCFormComplete = () => {
  return (
    <View style={styles.container}>
      <Text>Qui ci sarà un abc cognitivo completato</Text>
    </View>
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

export default ABCFormComplete;
