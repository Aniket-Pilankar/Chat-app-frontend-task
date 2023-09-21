import { UserSession } from '../db/auth/types';
import { API } from '../db/shared/api-response';

export const isSameSenderMargin = (
  messages: API.SendMessageResponse[] | API.IFetchMessagesById,
  m: API.SendMessageResponse | API.FetchMessagesById,
  i: number,
  userId: string,
) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return 'auto';
};

export const isSameSender = (
  messages: API.SendMessageResponse[] | API.IFetchMessagesById,
  m: API.SendMessageResponse | API.FetchMessagesById,
  i: number,
  userId: string,
) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (
  messages: API.SendMessageResponse[] | API.IFetchMessagesById,
  i: number,
  userId: string,
) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (
  messages: API.SendMessageResponse[] | API.IFetchMessagesById,
  m: API.SendMessageResponse | API.FetchMessagesById,
  i: number,
) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSenderFull = (
  loggedUser: UserSession['user'] | undefined,
  users: UserSession['user'][],
) => {
  return users[0]._id === loggedUser?._id ? users[1] : users[0];
};

export const getSender = (user: UserSession['user'] | undefined, users: UserSession['user'][]) => {
  console.log('users:', users);
  console.log('user:', user);
  return users[0]?._id === user?._id ? users[1]?.name : users[0]?.name;
};
