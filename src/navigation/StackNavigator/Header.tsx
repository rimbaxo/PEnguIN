import { FC, useMemo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import SvgCurve from './SvgCurve';
import type { HeaderProps } from './types';

import ButtonIcon from '@/components/ButtonIcon';

const Header: FC<HeaderProps> = (props) => {
  const { route, navigation, options, height } = props;
  const theme = useTheme();

  //const isAccount = route.name === 'Account';
  const isChat = route.name === 'Chat';

  const styles = useMemo(() => creatStyles(theme, height), [theme, height]);

  return (
    <View style={styles.header}>
      <SvgCurve color={theme.colors.primary} style={styles.svgCurve} />
      <Appbar style={styles.container}>
        <Appbar.Content titleStyle={styles.title} title={options.headerTitle} />
        <ButtonIcon
          icon="Messages2"
          isFocused={isChat}
          onPress={() => navigation.navigate('Chat')}
          color="rgba(255, 255, 255, 0.1)"
          iconColor={theme.colors.background}
          borderWidth={0}
        />
      </Appbar>
    </View>
  );
};

const creatStyles = (theme: ReactNativePaper.Theme, height: number | undefined) =>
  StyleSheet.create({
    header: {
      height: height ? height : 86,
    },
    svgCurve: {
      position: 'absolute',
      width: Dimensions.get('window').width,
    },
    container: {
      justifyContent: 'space-between',
      paddingHorizontal: theme.gaps.containerPaddingHorizontal,
      elevation: 0,
    },
    title: {},
  });

export default Header;
