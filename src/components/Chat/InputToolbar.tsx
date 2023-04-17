import { StyleSheet } from 'react-native';
import { InputToolbar as RNGCInputToolbar } from 'react-native-gifted-chat';
import { useTheme } from 'react-native-paper';

const InputToolbar = (props) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return <RNGCInputToolbar {...props} containerStyle={styles.InputToolbarStyle} />;
};

const useStyles = (colors) =>
  StyleSheet.create({
    InputToolbarStyle: {
      backgroundColor: colors.primary,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      paddingRight: 10,
      paddingVertical: 10,
    },
  });

export default InputToolbar;
