import { UserSession } from '../db/auth/types';

export const getSender = (user: UserSession['user'] | undefined, users: UserSession['user'][]) => {
  console.log('users:', users);
  console.log('user:', user);
  return users[0]?._id === user?._id ? users[1]?.name : users[0]?.name;
};
