import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';

import { SESSION_KEY, SESSION_SECRET } from './constant';
import { UserSession } from './types';

export const setSession = (session: UserSession) => {
  const sessionStr = JSON.stringify(session);
  console.log('sessionStr:', sessionStr);
  const sessionCipher = AES.encrypt(sessionStr, SESSION_SECRET).toString();
  window.localStorage.setItem(SESSION_KEY, sessionCipher);
};

export function clearSession() {
  window.localStorage.clear();
}

export const getSession = () => {
  try {
    const sessionCipher = window.localStorage.getItem(SESSION_KEY);

    if (!sessionCipher) return null;

    const bytes = AES.decrypt(sessionCipher, SESSION_SECRET);
    return JSON.parse(bytes.toString(utf8));
  } catch (error) {
    console.log('error:', error);
    return null;
  }
};
