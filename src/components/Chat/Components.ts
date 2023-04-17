type ComponentsChoice = 'EmotionWheel' | 'Cba' | 'ABCCognitive';
type IComponents = {
  [key in ComponentsChoice]: React.FC;
};

const Components: IComponents = {
  EmotionWheel: require('@/screens/EmotionWheel').default,
  Cba: require('@/screens/NewCBA').default,
  ABCCognitive: require('@/screens/ABC_Cognitive/Antecedent').default,
};

export default Components;
