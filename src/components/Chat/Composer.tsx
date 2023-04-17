import { StyleSheet } from 'react-native';
import { Composer as RNGCComposer } from 'react-native-gifted-chat';
import { useTheme } from 'react-native-paper';

const Composer = (props) => {
  const { setComposerHeight, ...rest } = props;

  const { colors } = useTheme();
  const styles = useStyles(colors);

  const minMaxHeight = (height) => {
    if (height < 41) return 41;
    if (height > 100) return 100;
    if (!height) return 41;
    return height;
  };

  return (
    <RNGCComposer
      {...rest}
      multiline
      containerStyle={{ flex: 1 }}
      textInputStyle={styles.textInputStyle}
      textInputProps={{
        textAlignVertical: 'top',
        onContentSizeChange(e) {
          const height = minMaxHeight(e.nativeEvent.contentSize.height);

          setComposerHeight(height);
        },
      }}
    />
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    textInputStyle: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginRight: 10,
      lineHeight: 21,
      backgroundColor: colors.primary,
      color: colors.surface,
      borderRadius: 40,
    },
  });

export default Composer;
