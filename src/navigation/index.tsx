import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useStateContext } from '@/context';
import AuthStack from '@/navigation/authStack';
import UserStack from '@/navigation/userStack';

const RootNavigation = () => {
  const stateContext = useStateContext();

  const user = stateContext?.state?.authUser;
  console.log(user);

  return <SafeAreaProvider>{user ? <UserStack /> : <AuthStack />}</SafeAreaProvider>;
};

export default RootNavigation;
