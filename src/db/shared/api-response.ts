import { UserSession } from '../auth/types';
import { SelectedChat } from '../types';

export namespace API {
  export interface LoginRequest {
    user: {
      _id: string;
      name: string;
      email: string;
      pic: string;
      isAdmin: boolean;
    };
    token: string;
  }

  export interface SendMessageResponse {
    sender: {
      _id: string;
      name: string;
      pic: string;
    };
    content: string;
    chat: SelectedChat;
    readBy: Pick<UserSession['user'], 'name' | 'pic' | 'email'>[];
    _id: string;
  }

  export interface FetchMessagesById {
    _id: string;
    sender: {
      _id: string;
      name: string;
      pic: string;
    };
    content: string;
    chat: SelectedChat & {
      latestMessage: string;
    };
    readBy: Pick<UserSession['user'], 'name' | 'pic' | 'email'>[];
  }

  export type IFetchMessagesById = FetchMessagesById[];
}
