import { BottomTabBarButtonProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../StackNavigator/types';
import { TraceParamList } from '../TraceNavigation/types';

export type TabNavigatorParamList = {
  Home: undefined;
  Agenda: undefined;
  Trace: NavigatorScreenParams<TraceParamList>;
  Diaries: undefined;
  Profile: undefined;
  Somministration: undefined /* Se aggiungeremo Somministration */;
};

export interface Routes {
  name: keyof TabNavigatorParamList;
  screen: React.ComponentType<any>;
  icon: IconName;
  label: string;
}

export type TabBarButtonProps = BottomTabBarButtonProps & {
  icon: IconName;
  label: string;
};

export type TabNavigatorProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;
