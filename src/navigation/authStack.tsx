import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Authentication } from '@/screens/Authentication';

const Stack = createStackNavigator();

const AuthStack = () => {
  console.log('auth stack');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
