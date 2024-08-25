import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mealReducer from './meals';

const reducer = combineReducers({
  meals: mealReducer,
});

export const store = configureStore({
  reducer,
});
