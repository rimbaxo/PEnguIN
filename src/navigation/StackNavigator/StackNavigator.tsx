import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './Header';
import SubHeader from './SubHeader';
import { RootStackParamList, Route } from './types';

import { useStateContext } from '@/context';
import HeaderABCCognitive from '@/navigation/StackNavigator/HeaderABCCognitive';
import HeaderExercise from '@/navigation/StackNavigator/HeaderExercise';
import HeaderWithInstructions from '@/navigation/StackNavigator/HeaderWithInstructions';
import BottomTabNavigator from '@/navigation/TabNavigator';
import ABCFormComplete from '@/screens/ABC_Cognitive/ABCFormComplete';
import Antecedent from '@/screens/ABC_Cognitive/Antecedent';
import AntecedentRecap from '@/screens/ABC_Cognitive/AntecedentRecap';
import Behaviour from '@/screens/ABC_Cognitive/Behaviour';
import BehaviourRecap from '@/screens/ABC_Cognitive/BehaviourRecap';
import Conseguente from '@/screens/ABC_Cognitive/Conseguente';
import ConseguenteRecap from '@/screens/ABC_Cognitive/ConseguenteRecap';
import Account from '@/screens/Account';
import Cba from '@/screens/Cba';
import Chat2 from '@/screens/Chat2';
import EmotionWheel from '@/screens/EmotionWheel';
import NewCba from '@/screens/NewCBA';
import SuccesScreen from '@/screens/SuccesScreen';
import SuccesScreenABC from '@/screens/SuccesScreenABC';
import SuccesScreenCBA from '@/screens/SuccesScreenCBA';
import ABCCognitive from '@/screens/Trace/ABCCognitive/ABCCognitive';
import EmotionExercises from '@/screens/Trace/EmotionExercises';
import Questionari from '@/screens/Trace/Questionari';
import { theme } from '@/theme/theme';
import type { User } from '@/types/user';
import { getHeaderTitle } from '@/utils/getHeaderTitle';
import { slideFromLeft, slideFromRight } from '@/utils/stackTransition';
const RootStack = createStackNavigator<RootStackParamList>();

const getScreens: (user: User | null) => Route[] | null = (user) =>
  user
    ? [
        {
          name: 'Main',
          screen: BottomTabNavigator,
          options: ({ route }) => ({
            headerTitle: getHeaderTitle(route, user),
            header: (props) => {
              return getFocusedRouteNameFromRoute(route) === 'Agenda' ? (
                <Header {...props} title="Main" height={45} />
              ) : (
                <Header {...props} title="Main" />
              );
            },
          }),
        },
        {
          name: 'Account',
          screen: Account,
          options: {
            ...slideFromLeft,
            header: (props) => <SubHeader {...props} title="Account" />,
          },
        },
        {
          name: 'Chat',
          screen: Chat2,
          options: {
            ...slideFromRight,
            header: (props) => <SubHeader {...props} title="Chat" />,
          },
        },
        {
          name: 'Cba',
          screen: Cba,
          options: { header: (props) => <SubHeader {...props} needConfirmation title="Cba" /> },
        },
        {
          name: 'EmotionExercises',
          screen: EmotionExercises,
          options: {
            ...slideFromRight,
            header: (props) => (
              <HeaderWithInstructions
                {...props}
                title="Esercizi emozioni"
                instructions="Qui trovi dei semplici esercizi per monitorare le tue emozioni.
          Ogni volta che completi un esercizio otterrai 30 punti che ti serviranno per raggiungere
          il livello successivo."
              />
            ),
          },
        },
        {
          name: 'Questionari',
          screen: Questionari,
          options: {
            ...slideFromRight,
            header: (props) => (
              <HeaderWithInstructions
                {...props}
                title="Questionari"
                instructions="Qui trovi l'elenco dei tuoi questionari.
          Ogni volta che ne compilerai uno otterrai 30 punti che ti serviranno per raggiungere
          il livello successivo."
              />
            ),
          },
        },
        {
          name: 'ABCCognitive',
          screen: ABCCognitive,
          options: {
            ...slideFromRight,
            header: (props) => <HeaderABCCognitive {...props} title="ABC Cognitivo" />,
          },
        },
        {
          name: 'EmotionWheel',
          screen: EmotionWheel,
          options: {
            ...slideFromRight,
            header: (props) => (
              <HeaderExercise
                {...props}
                title="Ruota delle emozioni"
                instructions="Trascina il cursone per posizionarti sulla ruota ed esprimere come ti senti."
                needConfirmation
                color="#f4f4f4"
              />
            ),
          },
        },
        {
          name: 'SuccesScreen',
          screen: SuccesScreen,
          options: { ...slideFromRight, headerShown: false },
        },
        {
          name: 'SuccesScreenCBA',
          screen: SuccesScreenCBA,
          options: { ...slideFromRight, headerShown: false },
        },
        {
          name: 'SuccesScreenABC',
          screen: SuccesScreenABC,
          options: { ...slideFromRight, headerShown: false },
        },
        {
          name: 'Antecedent',
          screen: Antecedent,
          options: {
            ...slideFromRight,
            header: (props) => (
              <HeaderExercise
                {...props}
                title="Antecedente"
                needConfirmation
                color={theme.colors.lavander}
              />
            ),
          },
        },
        {
          name: 'AntecedentRecap',
          screen: AntecedentRecap,
          options: {
            ...slideFromRight,
            header: (props) => (
              <HeaderExercise
                {...props}
                title="Riepilogo Antecedente"
                color={theme.colors.lavander}
                height={100}
                needConfirmation
                navTo="ABCCognitive"
              />
            ),
          },
        },
        {
          name: 'Conseguente',
          screen: Conseguente,
          options: {
            ...slideFromRight,
            header: (props) => (
              <HeaderExercise
                {...props}
                title="Conseguente"
                color={theme.colors.peach}
                needConfirmation
                navTo="ABCCognitive"
              />
            ),
          },
        },
        {
          name: 'ConseguenteRecap',
          screen: ConseguenteRecap,
          options: {
            ...slideFromRight,
            header: (props) => (
              <HeaderExercise
                {...props}
                title="Riepilogo Conseguente"
                color={theme.colors.peach}
                needConfirmation
                height={100}
                navTo="ABCCognitive"
              />
            ),
          },
        },
        {
          name: 'Behaviour',
          screen: Behaviour,
          options: {
            ...slideFromRight,
            header: (props) => (
              <HeaderExercise
                {...props}
                title="Behaviour"
                color="#f4f4f4"
                needConfirmation
                navTo="ABCCognitive"
              />
            ),
          },
        },
        {
          name: 'NewCba',
          screen: NewCba,
          options: {
            header: (props) => (
              <HeaderExercise
                {...props}
                title="CBA"
                needConfirmation
                color={theme.colors.palepink}
                height={150}
              />
            ),
          },
        },
        {
          name: 'ABCFormComplete',
          screen: ABCFormComplete,
          options: {
            header: (props) => (
              <HeaderExercise
                {...props}
                title="Riepilogo ABC"
                needConfirmation
                color={theme.colors.background}
                height={150}
              />
            ),
          },
        },
        {
          name: 'BehaviourRecap',
          screen: BehaviourRecap,
          options: {
            ...slideFromRight,
            header: (props) => (
              <HeaderExercise
                {...props}
                needConfirmation
                title="Riepilogo Behaviour"
                color="#f4f4f4"
                height={100}
                navTo="ABCCognitive"
              />
            ),
          },
        },
      ]
    : null;

const RootStackNavigator = () => {
  const { state } = useStateContext();
  const user = state?.authUser;
  const screens = getScreens(user);

  return (
    <RootStack.Navigator>
      {screens &&
        screens.map(({ name, screen, options }) => (
          <RootStack.Screen key={name} name={name} component={screen} options={options} />
        ))}
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
