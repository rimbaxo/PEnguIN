import React from 'react';
import { StyleSheet, View } from 'react-native';

import ButtonIcon from '@/components/ButtonIcon';
import { theme } from '@/theme/theme';

const ArrowButton = ({ scrollTo, icon }: { scrollTo: () => void; icon: IconName }) => {
  return (
    <View style={styles.container}>
      <ButtonIcon
        icon={icon}
        onPress={scrollTo}
        borderColor={theme.colors.primary}
        iconColor={theme.colors.primary}
        borderWidth={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
});

export default ArrowButton;
