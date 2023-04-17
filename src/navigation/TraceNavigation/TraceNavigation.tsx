import { createStackNavigator } from '@react-navigation/stack';

import { TraceParamList, Route } from './types';

import TraceList from '@/screens/Trace/TraceList';
import { getHeaderTitle } from '@/utils/getHeaderTitle';
//import { slideFromLeft, slideFromRight } from '@/utils/stackTransition';

const TraceStack = createStackNavigator<TraceParamList>();

const screens: Route[] = [
  {
    name: 'TraceList',
    screen: TraceList,
    options: ({ route }) => ({
      headerShown: false,
      tabBarLabel: getHeaderTitle(route),
    }),
  },
];

const TraceNavigation = () => {
  return (
    <TraceStack.Navigator>
      {screens.map(({ name, screen, options }) => (
        <TraceStack.Screen key={name} name={name} component={screen} options={options} />
      ))}
    </TraceStack.Navigator>
  );
};

export default TraceNavigation;
