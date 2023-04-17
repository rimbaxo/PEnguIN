import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, Dialog as RNPDialog, Button, Paragraph, useTheme } from 'react-native-paper';

import { PropTypes } from './types';

import Icon from '@/components/Icon';

const Dialog: FC<PropTypes> = (props) => {
  const { visible, dismissable = false, icon, iconColor, title, content, actions } = props;

  const { colors } = useTheme();

  return (
    <Portal>
      <RNPDialog visible={visible} dismissable={dismissable} style={styles.dialog}>
        <View style={styles.dialogIcon}>
          <Icon iconName={icon} size="72" color={iconColor} variant="Bold" />
        </View>
        <RNPDialog.Title style={styles.dialogTitle}>{title}</RNPDialog.Title>
        <RNPDialog.Content>
          <Paragraph style={styles.dialogText}>{content}</Paragraph>
        </RNPDialog.Content>
        <RNPDialog.Actions style={styles.dialogActions}>
          {actions.map((action, index) => {
            const { mode = 'contained', onPress, text, color = `${colors.primary}` } = action;

            return (
              <Button
                key={index}
                style={styles.dialogButtons}
                labelStyle={{ width: '100%' }}
                onPress={onPress}
                mode={mode}
                color={color}>
                {text}
              </Button>
            );
          })}
        </RNPDialog.Actions>
      </RNPDialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    position: 'relative',
    alignItems: 'center',
    paddingBottom: 20,
    borderRadius: 20,
  },
  dialogIcon: {
    position: 'absolute',
    top: -32,
    backgroundColor: '#f5feff',
    borderRadius: 50,
  },
  dialogTitle: {
    textAlign: 'center',
    marginTop: 55,
    marginBottom: 0,
  },
  dialogText: {
    textAlign: 'center',
  },
  dialogActions: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialogButtons: {
    display: 'flex',
    marginTop: 10,
    marginHorizontal: 20,
  },
});

export default Dialog;
