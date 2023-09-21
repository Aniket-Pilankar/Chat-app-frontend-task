import { createReducer } from '@reduxjs/toolkit';

import { trylogout } from './actions';
import { getSession } from './session';
import { tryLogin } from './thunk-request';
import { UserSession } from './types';

interface InitialState {
  session: UserSession | null;
}

const getInitialSession = () => {
  const sessionWithIsAuthenticated = getSession();

  if (!sessionWithIsAuthenticated) return null;

  const { password, ...userSession } = sessionWithIsAuthenticated;
  return userSession;
};

const initialState: InitialState = { session: getInitialSession() };

const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(tryLogin.fulfilled, (state, action) => {
    console.log(action.payload);
    state.session = {
      ...action.payload,
    };
  });
  builder.addCase(trylogout, (state, action) => {
    state.session = null;
  });
});

export default authReducer;
