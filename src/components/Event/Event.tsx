import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';

import Icon from '../Icon';

import Surface from '@/components/Surface';

interface Props {
  id: number;
  text: string;
  'time-start': string;
  'time-end'?: string;
  type: string;
}

const Event: FC<Props> = (props) => {
  const { text, type } = props;

  const color = (): keyof ReactNativePaper.ThemeColors => {
    switch (type) {
      case 'drug':
        return 'lavander';
      case 'event':
        return 'yellow';
      case 'trace':
        return 'peach';
      default:
        return 'surface';
    }
  };

  return (
    <View style={styles.event}>
      <Surface color={color()}>
        <View style={styles.eventContent}>
          <Paragraph>{text}</Paragraph>
          <View style={styles.eventTime}>
            <Paragraph>{props['time-start']}</Paragraph>
            {props['time-end'] && <Paragraph>{props['time-end']}</Paragraph>}
          </View>
          <Icon iconName="Clock" size={20} />
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    paddingBottom: 10,
  },
  eventContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTime: {
    paddingRight: 10,
    marginLeft: 'auto',
  },
});

export default Event;

