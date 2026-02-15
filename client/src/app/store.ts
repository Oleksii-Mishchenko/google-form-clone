import { configureStore } from '@reduxjs/toolkit';
import formBuilderReducer from '../features/formBuilder/formBuilderSlice';

import { api } from './api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    formBuilder: formBuilderReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
