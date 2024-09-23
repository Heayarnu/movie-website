import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailReducer';

export const store = configureStore({
  reducer: {
    email: emailReducer,
  },
});

// Define a type for the dispatch function of your Redux store
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
