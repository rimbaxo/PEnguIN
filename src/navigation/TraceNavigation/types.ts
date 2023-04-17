import type {
  StackHeaderProps,
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { StyleProp, ViewStyle } from 'react-native';

export type TraceParamList = {
  TraceList: undefined;
  EmotionExercises: undefined;
  ABCCognitive: undefined;
  SuccesScreen: undefined;
  SuccesScreenCBA: undefined;
  SuccesScreenABC: undefined;
};

export type HeaderProps = StackHeaderProps & {
  needConfirmation?: boolean;
};

export type SvgCurveProps = {
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export interface Route {
  name: keyof TraceParamList;
  screen: React.ComponentType<any>;
  options:
    | ((props: StackScreenProps<TraceParamList>) => StackNavigationOptions)
    | StackNavigationOptions;
}
