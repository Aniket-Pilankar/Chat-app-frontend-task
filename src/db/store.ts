import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/reducer';
import chatReducer from './chat/reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
