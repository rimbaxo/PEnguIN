import { useState, useEffect, useMemo, FC } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import { HeaderProps } from './types';

import ButtonIcon from '@/components/ButtonIcon';
import Dialog from '@/components/Dialog';
import SvgCurve from '@/navigation/StackNavigator/SvgCurve';

const SubHeader: FC<HeaderProps> = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [exitConfirmed, setExitConfirmed] = useState(false);

  const { navigation, needConfirmation, title } = props;
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
      navigation.goBack();
    }

    return () => setExitConfirmed(false);
  }, [exitConfirmed]);

  const ACTIONS = [
    { onPress: () => hideDialog(), text: 'Continua la compilazione' },
    { onPress: () => hideDialog(true), text: 'Torna alla Home', color: colors.error },
  ];

  const theme = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);
  console.log('TITOLO', title);

  return (
    <View style={styles.header}>
      <SvgCurve color={colors.primary} style={styles.svgCurve} />
      <Appbar style={styles.container}>
        <ButtonIcon
          icon="ArrowLeft"
          onPress={showDialog}
          color="rgba(255, 255, 255, 0.1)"
          iconColor={theme.colors.background}
        />
        <Appbar.Content title={title} />
        <Dialog
          visible={dialogOpen}
          icon="InfoCircle"
          iconColor={colors.error}
          title="Attenzione!"
          content="Stai lasciando la compilazione del questionario. Lasciando la compilazione del questionario perderai tutti i progressi."
          actions={ACTIONS}
        />
      </Appbar>
    </View>
  );
};

SubHeader.defaultProps = {
  needConfirmation: false,
};

const createStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    header: {
      height: 60,
    },
    svgCurve: {
      position: 'absolute',
      width: Dimensions.get('window').width,
    },
    container: {
      elevation: 0,
      paddingHorizontal: theme.gaps.containerPaddingHorizontal,
    },
  });

export default SubHeader;
