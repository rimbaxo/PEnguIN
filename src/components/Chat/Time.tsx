import { Time as RNGCTime } from 'react-native-gifted-chat';
import { useTheme } from 'react-native-paper';

const Time = (props) => {
  const { colors } = useTheme();
  return (
    <RNGCTime
      {...props}
      timeTextStyle={{ left: { color: colors.text }, right: { color: colors.text } }}
    />
  );
};

export default Time;
