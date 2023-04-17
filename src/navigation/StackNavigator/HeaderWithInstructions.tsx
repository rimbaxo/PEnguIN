import { useState, useEffect, useMemo, FC } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import { HeaderProps } from './types';

import ButtonIcon from '@/components/ButtonIcon';
import Dialog from '@/components/Dialog';
import SvgCurve2 from '@/navigation/StackNavigator/SvgCurve2';

const HeaderWithInstructions: FC<HeaderProps> = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [exitConfirmed, setExitConfirmed] = useState(false);

  const { navigation, needConfirmation, title, instructions } = props;
  const { colors } = useTheme();

  const showDialog = () => {
    if (!needConfirmation) return setExitConfirmed(true);
    setDialogOpen(true);
  };
  const hideDialog = (confirmExit?: boolean) => {
    setDialogOpen(false);
    if (confirmExit) {
      setExitConfirmed(true);
    }
  };

  useEffect(() => {
    if (exitConfirmed) {
      navigation.navigate('TraceList');
    }

    return () => setExitConfirmed(false);
  }, [exitConfirmed]);

  const ACTIONS = [
    { onPress: () => hideDialog(), text: 'Continua la compilazione' },
    { onPress: () => hideDialog(true), text: 'Torna alla Home', color: colors.error },
  ];

  const theme = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.header}>
      <Appbar style={styles.container}>
        <View style={styles.barNav}>
          <ButtonIcon
            icon="ArrowLeft"
            onPress={showDialog}
            color="rgba(255, 255, 255, 0.1)"
            iconColor={theme.colors.background}
          />
          <Appbar.Content title={title} />
        </View>
        <Text style={styles.text}>{instructions}</Text>
        <Dialog
          visible={dialogOpen}
          icon="InfoCircle"
          iconColor={colors.error}
          title="Attenzione!"
          content="Stai lasciando la compilazione del questionario. Lasciando la compilazione del questionario perderai tutti i progressi."
          actions={ACTIONS}
        />
      </Appbar>
      <SvgCurve2 color={colors.primary} style={styles.svgCurve} />
    </View>
  );
};

HeaderWithInstructions.defaultProps = {
  needConfirmation: false,
};

const createStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    header: {
      height: 250,
      backgroundColor: 'rgba(255, 3, 4, 0)',
    },
    svgCurve: {
      position: 'relative',
      width: Dimensions.get('window').width,
    },
    container: {
      height: 180,
      paddingHorizontal: theme.gaps.containerPaddingHorizontal,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    barNav: {
      top: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'Satoshi',
      padding: 20,
      color: '#EBFDFF',
      fontSize: 14,
    },
  });

export default HeaderWithInstructions;
