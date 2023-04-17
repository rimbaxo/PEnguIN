import { FC, memo } from 'react';
import { FlatList } from 'react-native';

import CbaQuestion from './CbaQuestion';
import { PropTypes } from './types';

const CbaWizzard: FC<PropTypes.CbaWizzard> = ({ questions, control, isStepValid }) => {
  return (
    <FlatList
      data={questions}
      renderItem={({ item }) => (
        <CbaQuestion item={item} control={control} isStepValid={isStepValid} />
      )}
    />
  );
};

export default memo(CbaWizzard);
