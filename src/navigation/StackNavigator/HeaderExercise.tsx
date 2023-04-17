import { FC, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import ButtonIcon from '@/components/ButtonIcon';
import Dialog from '@/components/Dialog';
import { HeaderProps } from '@/navigation/StackNavigator/types';

const HeaderExercise: FC<HeaderProps> = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { navigation, needConfirmation, title, instructions, color, iconColor, height, navTo } =
    props;
  const [exitConfirmed, setExitConfirmed] = useState(false);

  const createStyles = (theme: ReactNativePaper.Theme) =>
    StyleSheet.create({
      header: {
        height: height ? height : 200,
        backgroundColor: color,
      },
      container: {
        height: height ? height : 200,
        paddingHorizontal: theme.gaps.containerPaddingHorizontal,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: color,
        bottomOpacity: 0.0,
        elevation: 0.0,
      },
      barNav: {
        display: 'flex',
        alignItems: 'flex-start',
        top: 15,
        width: Dimensions.get('screen').width,
        paddingLeft: 10,
      },
      text: {
        fontFamily: 'Satoshi',
        padding: 20,
        color: '#EBFDFF',
        fontSize: 14,
      },
      titleContainer: {
        top: 25,
        width: Dimensions.get('screen').width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: theme.colors.primary,
        fontSize: 24,
      },
      title: {
        color: theme.colors.primary,
        fontSize: 24,
        fontFamily: 'Satoshi',
        textAlign: 'center',
      },
      instructionsContainer: {
        top: 50,
        width: Dimensions.get('screen').width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      instructions: {
        width: Dimensions.get('screen').width,
        color: theme.colors.primary,
        fontSize: 16,
        fontFamily: 'Satoshi',
        textAlign: 'center',
      },
    });

  const { colors } = useTheme();

  const hideDialog = (confirmExit?: boolean) => {
    setDialogOpen(false);
    if (confirmExit) {
      setExitConfirmed(true);
    }
  };

  const showDialog = () => {
    if (!needConfirmation) return setExitConfirmed(true);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (exitConfirmed) {
      navTo ? navigation.navigate(navTo) : navigation.goBack();
    }

    return () => setExitConfirmed(false);
  }, [exitConfirmed]);

  const ACTIONS = [
    { onPress: () => hideDialog(), text: 'Annulla' },
    { onPress: () => hideDialog(true), text: 'Esci', color: colors.error },
  ];

  const theme = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.header}>
      <Appbar style={styles.container}>
        <View style={styles.barNav}>
          <ButtonIcon
            icon="Add"
            isFocused
            onPress={showDialog}
            rotate
            iconColor={iconColor}
            color={color}
            borderColor={theme.colors.primary}
            borderWidth={1}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
        <Dialog
          visible={dialogOpen}
          icon="InfoCircle"
          iconColor={colors.error}
          title="Attenzione!"
          content="Stai per uscire. Uscendo perderai tutti i progressi fatti fino ad ora. Sei sicuro di voler uscire?"
          actions={ACTIONS}
        />
      </Appbar>
    </View>
  );
};

HeaderExercise.defaultProps = {
  needConfirmation: false,
};

export default HeaderExercise;
