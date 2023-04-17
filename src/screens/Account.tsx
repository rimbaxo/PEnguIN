import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useCookies } from 'react-cookie';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { useStateContext } from '@/context';
import { theme } from '@/theme/theme';
import { locStorage } from '@/utils';

const Account = () => {
  const queryClient = useQueryClient();
  const [_cookies, _setCookie, removeCookie] = useCookies(['logged_in']);
  const { dispatch } = useStateContext();

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          queryClient.invalidateQueries();
          removeCookie('logged_in');
          locStorage.removeItem('token');
          dispatch({ type: 'LOGOUT' });
        }}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});

export default Account;
