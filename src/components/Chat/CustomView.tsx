import { StyleSheet, View, Image } from 'react-native';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';
import { useTheme } from 'react-native-paper';

import Components from '@/components/Chat/Components';

const CustomView = (
  props: Readonly<BubbleProps<IMessage>> &
    Readonly<{
      children?: React.ReactNode;
    }>
): React.ReactElement => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  //const Component = Components[props.currentMessage.component];

  return props.currentMessage.component ? (
    <View style={styles.customViewContainer}>
      <Image
        style={{ maxWidth: '100%', maxHeight: 300 }}
        source={require('../../assets/images/brown-wooden-blocks-with-number.jpg')}
      />
    </View>
  ) : null;
};

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    customViewContainer: {},
  });

export default CustomView;
