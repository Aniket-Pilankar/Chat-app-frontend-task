import { RootState } from '../store';

export const selectSession = (state: RootState) => state.auth.session;
