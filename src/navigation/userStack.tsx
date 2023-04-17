import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import StackNavigator from '@/navigation/StackNavigator';

const Stack = createStackNavigator();

const UserStack = () => {
  const { top, bottom } = useSafeAreaInsets();
  console.log('user stack');
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { flex: 1, top, bottom, marginBottom: bottom },
        }}>
        <Stack.Screen name="authUser" component={StackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
