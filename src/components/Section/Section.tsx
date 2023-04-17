import { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import SectionHeader from './SectionHeader';

import { TabNavigatorParamList } from '@/navigation/TabNavigator/types';

interface Props {
  children: React.ReactNode;
  title?: string;
  action?: {
    label: string;
    to: keyof TabNavigatorParamList;
  };
}

const Section: FC<Props> = (props) => {
  const { children, title, action } = props;

  const theme = useTheme();

  const styles = useMemo(() => creatStyles(theme), [theme]);

  return (
    <View style={styles.section}>
      {title && <SectionHeader title={title} action={action} />}
      {children}
    </View>
  );
};

const creatStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    section: {
      marginVertical: theme.gaps.sectionPaddingVertical,
    },
  });

export default Section;
