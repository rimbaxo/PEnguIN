import type { NavigatorScreenParams } from '@react-navigation/native';
import type {
  StackHeaderProps,
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { StyleProp, ViewStyle } from 'react-native';

import { TabNavigatorParamList } from '@/navigation/TabNavigator/types';

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabNavigatorParamList>;
  Account: undefined;
  Chat: undefined;
  Cba: undefined;
  SignIn: undefined;
  EmotionExercises: undefined;
  ABCCognitive: undefined;
  EmotionWheel: undefined;
  SuccesScreen: undefined;
  SuccesScreenCBA: undefined;
  SuccesScreenABC: undefined;
  Antecedent: undefined;
  AntecedentRecap: undefined;
  Conseguente: undefined;
  Behaviour: undefined;
  ConseguenteRecap: undefined;
  BehaviourRecap: undefined;
  NewCba: undefined;
  Questionari: undefined;
  ABCFormComplete: undefined;
};

export type HeaderProps = StackHeaderProps & {
  needConfirmation?: boolean;
  title: string;
  instructions?: string;
  exercise?: string;
  progressInfo?: string;
  color?: string;
  iconColor?: string;
  height?: number;
  navTo?: string;
};

export type SuccesScreenProps = {
  title: string;
  navTo: string;
};

export type SvgCurveProps = {
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export interface Route {
  name: keyof RootStackParamList;
  screen: React.ComponentType<any>;
  options:
    | ((props: StackScreenProps<RootStackParamList>) => StackNavigationOptions)
    | StackNavigationOptions;
}
