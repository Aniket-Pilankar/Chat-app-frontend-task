import { useDispatch } from 'react-redux';

import { AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;

interface BasePayload {
  email: string;
  password: string;
}

export interface LoginPayload extends BasePayload {}

export interface SignInPayload extends BasePayload {
  name: string;
  pic?: string;
}
