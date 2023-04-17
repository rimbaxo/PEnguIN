import { InfoCircle } from 'iconsax-react-native';
import { FC, memo } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { Card, Text, RadioButton, HelperText, Title, useTheme } from 'react-native-paper';

import { PropTypes } from './types';

const CbaQuestion: FC<PropTypes.CbaQuestion> = ({ item, control, isStepValid }) => {
  const { id, text } = item;
  const { colors } = useTheme();

  const { width: innerWidth } = Dimensions.get('window');

  const width = {
    width: innerWidth,
  };

  const CHOICES = [
    { text: 'Per nulla', value: '0' },
    { text: 'Poco', value: '1' },
    { text: 'Abbastanza', value: '2' },
    { text: 'Molto', value: '3' },
    { text: 'Moltissimo', value: '4' },
  ];

  return (
    <Card style={[styles.card, width]}>
      <Card.Content>
        <Title>{`${id}. ${text}`}</Title>
        <Controller
          name={id.toString()}
          control={control}
          defaultValue=""
          rules={{
            required: { message: 'Per continuare, deve rispondere alla domanda', value: true },
          }}
          render={({ field, fieldState }) => {
            const { onChange, value } = field;
            const { error } = fieldState;
            const isError = error !== undefined;
            return (
              <View>
                <RadioButton.Group
                  onValueChange={async (value) => {
                    onChange(value);
                    await isStepValid();
                  }}
                  value={value}>
                  <FlatList
                    data={CHOICES}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.choice}>
                        <RadioButton value={item.value} />
                        <Text style={styles.label}>{item.text}</Text>
                      </View>
                    )}
                  />
                </RadioButton.Group>
                {error && (
                  <View style={styles.helperContainer}>
                    <InfoCircle size="14" color={colors.error} />
                    <HelperText visible={isError} type="error" style={styles.helperText}>
                      {error?.message}
                    </HelperText>
                  </View>
                )}
              </View>
            );
          }}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 10,
    elevation: 0,
  },
  title: {
    flexWrap: 'wrap',
  },
  choice: {
    position: 'relative',
    marginTop: 5,
  },
  label: {
    position: 'absolute',
    left: 40,
    top: 10,
    zIndex: -1,
  },
  helperContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  helperText: {
    fontSize: 12,
    paddingHorizontal: 6,
  },
});

export default memo(
  CbaQuestion,
  (prevProps, nextProps) => prevProps.isStepValid === nextProps.isStepValid
);
