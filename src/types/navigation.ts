import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

import type { RootStackParamList } from '@/navigation/StackNavigator/types';
import type { TabNavigatorParamList } from '@/navigation/TabNavigator/types';
import type { TraceParamList } from '@/navigation/TraceNavigation/types';

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
export type MainTabScreenProps<T extends keyof TabNavigatorParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabNavigatorParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
export type TraceScreenProps<T extends keyof TraceParamList> = CompositeScreenProps<
  StackScreenProps<TraceParamList, T>,
  MainTabScreenProps<keyof TabNavigatorParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
