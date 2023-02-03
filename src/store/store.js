import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userReducer } from './userReducer';
import { progressReducer } from './progressReducer';
import { snackbarReducer } from './snackbarReducer';
import { sidebarReducer } from './sidebarReducer';
const rootReducer = combineReducers({
  userReducer,
  progressReducer,
  snackbarReducer,
  sidebarReducer,
});
export const store = configureStore({reducer: rootReducer,});
