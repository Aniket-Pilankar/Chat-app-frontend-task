import { createAsyncThunk } from '@reduxjs/toolkit';

import request from '../../utils/request';
import { urls } from '../../utils/urls';
import { UserSession } from '../auth/types';
import { API } from '../shared/api-response';
import { SelectedChat } from '../types';

export const searchUser = createAsyncThunk(
  'chat/user/search',
  async (payload: { search: string }) => {
    const { search } = payload;
    const response = await request.get<UserSession['user'][]>(urls.users, {
      params: {
        search,
      },
    });
    console.log('response:', response);
    return response.data;
  },
);

export const accessChats = createAsyncThunk(
  'chat/user/access',
  async (payload: { userId: string }) => {
    const { userId } = payload;

    const response = await request.post<SelectedChat>(urls.chats, { userId });

    return response.data;
  },
);

export const fetchChats = createAsyncThunk('chat/user/fetch', async () => {
  const response = await request.get(urls.chats);

  return response.data;
});

export const createGroup = createAsyncThunk(
  'chat/group/create',
  async (payload: { name: string; users: string[] }) => {
    const response = await request.post(urls.createGroup, payload);

    return response.data;
  },
);

interface AddToGroup {
  chatId: string;
  userId: string;
}

export const addToGroup = createAsyncThunk('chat/group/addMember', async (payload: AddToGroup) => {
  const response = await request.put(urls.addToGroup, payload);
  console.log('response', response);
  return response.data;
});

interface RemoveFromGroup {
  chatId: string;
  userId: string;
  loggedInUserId: string;
}

export const removeFromGroup = createAsyncThunk(
  'chat/group/removeMember',
  async (payload: RemoveFromGroup) => {
    const { loggedInUserId, chatId, userId } = payload;
    const response = await request.put(urls.removeUserFromGroup, { chatId, userId });
    console.log('response', response);
    return { ...response.data, removedUserId: userId, loggedInUserId };
  },
);

interface RenameGroupRequest {
  chatId: string;
  chatName: string;
}

export const renameGroup = createAsyncThunk(
  'chat/group/rename',
  async (payload: RenameGroupRequest) => {
    const response = await request.put(urls.renameGroup, payload);
    console.log('response', response);
    return response.data;
  },
);

export const sendMessageRequest = createAsyncThunk(
  'chat/message/send',
  async (payload: { content: string; chatId: string }) => {
    const response = await request.post<API.SendMessageResponse>(urls.sendMessage, payload);

    return response.data;
  },
);

export const getMessagesById = createAsyncThunk(
  'chat/message/fetch/byId',
  async (payload: { chatId: string }) => {
    const { chatId } = payload;
    const response = await request.get<API.IFetchMessagesById>(urls.getAllMessage(chatId));

    return response.data;
  },
);
