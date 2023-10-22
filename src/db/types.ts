import { useDispatch } from 'react-redux';

import { UserSession } from './auth/types';
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

export interface SelectedChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserSession['user'][];
  groupAdmin?: UserSession['user'];
}
