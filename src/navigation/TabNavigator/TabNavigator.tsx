import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FC } from 'react';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TraceNavigation from '../TraceNavigation';
import TabBarButton from './TabBarButton';
import type { TabNavigatorParamList, Routes } from './types';

import Account from '@/screens/Account';
import Agenda from '@/screens/Agenda';
import Home from '@/screens/Home';
// import Trace from '@/screens/Trace';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const routes: Routes[] = [
  { name: 'Home', screen: Home, icon: 'Home', label: 'Home' },
  { name: 'Agenda', screen: Agenda, icon: 'Calendar2', label: 'Agenda' },
  { name: 'Trace', screen: TraceNavigation, icon: 'Add', label: 'Traccia' },
  { name: 'Profile', screen: Account, icon: 'Profile', label: 'Profilo' },
];

const BottomTabNavigator: FC<TabNavigatorParamList> = () => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{
        flex: 1,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primary,
          justifyContent: 'center',
          height: 100 + bottom,
          bottom: -1,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.background,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      {routes.map(({ name, screen, icon, label }, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={screen}
          options={{
            tabBarButton: (props) => <TabBarButton {...props} icon={icon} label={label} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
