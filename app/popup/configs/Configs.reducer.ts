import { Reducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

export interface IConfigsState {
  auth?: {
    deviceId: string;
    deviceToken: string;
  };
  language: string;
}

const initialState: IConfigsState = {
  language: 'en',
};

const configReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  },
): Reducer & any => {
  switch (action.type) {
    default:
      return state;
  }
};

const persistConfig = {
  key: 'config',
  storage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, configReducer);
