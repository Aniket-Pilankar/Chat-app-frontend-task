import { createAsyncThunk } from '@reduxjs/toolkit';

import request from '../../utils/request';
import { urls } from '../../utils/urls';
import { API } from '../shared/api-response';
import { LoginPayload, SignInPayload } from '../types';
import { setSession } from './session';

export const tryLogin = createAsyncThunk('auth/login/try', async (payload: LoginPayload) => {
  const response = await request.post<API.LoginRequest>(urls.login, payload);
  console.log('response:', response);
  setSession(response.data);
  return response.data;
});

export const trySignIn = createAsyncThunk('auth/signIn/try', async (payload: SignInPayload) => {
  const response = await request.post(urls.signUp, payload);
  console.log('response:', response);
  return response.data;
});
