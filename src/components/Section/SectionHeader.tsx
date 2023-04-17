import { useNavigation } from '@react-navigation/native';
import { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Subheading, useTheme } from 'react-native-paper';

import { MainTabScreenProps } from '@/types/navigation';

type Props = {
  title: string;
  action?: {
    label: string;
    to: keyof MainTabScreenProps<'Home'>['navigation']['navigate'];
  };
};

const SectionHeader: FC<Props> = (props) => {
  const { title, action } = props;
  const theme = useTheme();
  const navigation = useNavigation<MainTabScreenProps<'Home'>['navigation']>();

  const handleClick = () => {
    if (!action) return;
    navigation.navigate(action.to);
  };

  const styles = useMemo(() => creatStyles(theme), [theme]);

  return (
    <View style={styles.sectionHeader}>
      <Subheading>{title}</Subheading>
      {action && (
        <Button onPress={handleClick} color={theme.colors.accent} compact>
          {action.label}
        </Button>
      )}
    </View>
  );
};

const creatStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.gaps.gutter,
    },
  });

export default SectionHeader;
