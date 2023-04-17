import { useNavigation } from '@react-navigation/native';
import { useState, useRef, useMemo, FC } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { StyleSheet, View, Animated, Dimensions, FlatList } from 'react-native';
import { BASE_URL, API_PORT } from 'react-native-dotenv';
import { Title, Text, Subheading, useTheme } from 'react-native-paper';

import CbaStepper from './CbaStepper';
import CbaWizzard from './CbaWizzard';
import { PropTypes } from './types';

import Dialog from '@/components/Dialog';
import { MainTabScreenProps } from '@/types/navigation';

const splitQuestionsPerStep = (questions: PropTypes.Question[], chunk: number) => {
  const splittedQuestions: PropTypes.Question[][] = [];
  const questionDividedPerSection = [
    [...questions.slice(0, 40)],
    [...questions.slice(40, 66)],
    [...questions.slice(66)],
  ];

  questionDividedPerSection.forEach((questions) => {
    for (let i = 0; i < questions.length; i += chunk) {
      splittedQuestions.push(questions.slice(i, i + chunk));
    }
  });
  return splittedQuestions;
};

const AfterSubmitModal = (props: {
  visible: boolean;
  state: boolean | null;
  hideModal: (success?: boolean) => void;
}) => {
  const { visible, state, hideModal } = props;
  const { colors } = useTheme();

  return state ? (
    <Dialog
      visible={visible}
      icon="TickCircle"
      iconColor={colors.success}
      title="Grazie!"
      content={`Le risposte sono state inviate\n con successo.`}
      actions={[{ onPress: () => hideModal(true), text: 'Torna alla Home' }]}
    />
  ) : (
    <Dialog
      visible={visible}
      icon="CloseCircle"
      iconColor={colors.error}
      title="Ooops!"
      content={`C'è stato qualche problema con\n l'invio delle risposte`}
      actions={[{ onPress: () => hideModal(), text: 'Torna alla Home' }]}
    />
  );
};

const CbaForm: FC<PropTypes.CbaForm> = ({ questions }) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<boolean | null>(null);

  const showModal = () => setVisible(true);
  const hideModal = (success?: boolean) => {
    setVisible(false);
    if (success) resetAndGoHome();
  };

  const QUESTION_PER_PAGE = 1;
  const splittedQuestions = splitQuestionsPerStep(questions, QUESTION_PER_PAGE);

  const { control, handleSubmit, reset, trigger } = useForm<FormValues>();
  const navigation = useNavigation<MainTabScreenProps<'Home'>['navigation']>();

  const resetAndGoHome = () => {
    setActiveStep(0);
    reset();
    navigation.navigate('Home');
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const preparedData: { [key: string]: number } = {};
    Object.keys(data).forEach((item) => (preparedData[item] = parseInt(data[item], 10)));
    const somministrazione = {
      data: new Date().toISOString(),
      tag: 'dopo',
      terapia: 'test',
      questionario: 'cba-ve',
      risposte: preparedData,
    };

    fetch(`${BASE_URL}:${API_PORT}/therapists/62c85d1daa49f90055dc41fb/somministrazione`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(somministrazione),
    })
      .then((response) => {
        return response.json();
      })
      .then((_) => {
        setState(true);
        showModal();
      })
      .catch((err) => {
        console.error(err);
        setState(false);
        showModal();
      });
  };
  const onError: SubmitErrorHandler<FormValues> = (errors) => console.log(errors);

  const steps = splittedQuestions.length - 1;
  const [activeStep, setActiveStep] = useState(0);

  const isStepValid = async () => {
    const activeQuestionId = splittedQuestions[activeStep].map(({ id }) => id.toString());
    const isStepValid = await trigger(activeQuestionId);
    return isStepValid;
  };

  const handleNext = async () => {
    if (activeStep === steps) return;

    if (await isStepValid()) {
      list.current?.scrollToOffset({ animated: true, offset: width * (activeStep + 1) });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    if (activeStep === 0) return;
    list.current?.scrollToOffset({ animated: true, offset: (activeStep - 1) * width });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const list = useRef<FlatList<PropTypes.Question[]>>(null);
  const instructions = () => {
    if (activeStep >= 23) {
      return <Subheading>Negli ultimi 15 giorni, HO AVUTO:</Subheading>;
    }

    if (activeStep >= 14) {
      return <Subheading>Negli ultimi 15 giorni, MI SONO SENTITO:</Subheading>;
    }

    return (
      <Subheading>
        Legga le seguenti frasi e per ognuna segni la risposta che meglio descrive come si è sentito
        in questo periodo. Faccia riferimento agli{' '}
        <Text style={{ fontWeight: 'bold' }}>ultimi 15 giorni, compreso oggi</Text>, e scelga la sua
        risposta:
      </Subheading>
    );
  };

  const { width } = Dimensions.get('window');

  const renderItem = ({ item }: { item: PropTypes.Question[] }) => (
    <CbaWizzard questions={item} control={control} isStepValid={isStepValid} />
  );

  //const keyExtractor = (item: PropTypes.Question[], index: number) => `${item + index}`; keyExtractor={keyExtractor} is needed?
  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const theme = useTheme();

  const styles = useMemo(() => creatStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Title>Istruzioni</Title>
      {instructions()}
      <Animated.FlatList
        scrollEnabled={false}
        horizontal
        snapToInterval={width}
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        ref={list}
        data={splittedQuestions}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        windowSize={2}
      />
      <CbaStepper
        steps={steps}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        handleSubmit={handleSubmit(onSubmit, onError)}
      />
      <AfterSubmitModal state={state} visible={visible} hideModal={hideModal} />
    </View>
  );
};

const creatStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: theme.gaps.containerPaddingHorizontal,
    },
  });

export default CbaForm;
