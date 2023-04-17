import { StyleSheet } from 'react-native';
import { Send as RNGCSend } from 'react-native-gifted-chat';
import { useTheme } from 'react-native-paper';

import Icon from '@/components/Icon';

const Send = (props) => {
  const { colors } = useTheme();
  return (
    <RNGCSend {...props} containerStyle={styles.sendContainerStyle}>
      <Icon color={colors.accent} iconName="Send" />
    </RNGCSend>
  );
};

const styles = StyleSheet.create({
  sendContainerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
    paddingLeft: 12,
    /* backgroundColor: colors.accent,
    borderRadius: 500, */
  },
});

export default Send;
