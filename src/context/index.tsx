import React from 'react';

import { locStorage } from '@/utils';

const initialState = async () => {
  const state = await locStorage.getItem('state');
  return (
    state || {
      authUser: null,
    }
  );
};

const StateContext = React.createContext(undefined);

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        authUser: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const StateContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  const value = { state, dispatch };

  React.useEffect(() => {
    const setItem = async () => {
      if (typeof state === 'function') {
        const awaitState = await state();
        if (awaitState) return;
      }
      await locStorage.setItem('state', state);
    };
    setItem();
  }, [state]);
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

const useStateContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { StateContextProvider, useStateContext };
