import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import apiReducer from '../slices/apiReducer';
import snackReducer from '../slices/snackReducer';

export const store = configureStore({
  reducer: {
    apiReducer,
    snackReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
