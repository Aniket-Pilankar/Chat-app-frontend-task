import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { SelectedChat } from '../types';
import { selectedChatCreateAction } from './action';
import { accessChats, createGroup, fetchChats } from './thunk-request';

interface InitialState {
  selectedChat: SelectedChat | null;
  chats: SelectedChat[];
}

const initialState: InitialState = { selectedChat: null, chats: [] };

const chatReducer = createReducer(initialState, (builder) => {
  builder.addCase(accessChats.fulfilled, (state, action) => {
    console.log(action.payload);
    state.selectedChat = null;
    state.selectedChat = action.payload;
  });

  builder.addCase(selectedChatCreateAction, (state, action: PayloadAction<SelectedChat>) => {
    console.log(action.payload);
    state.selectedChat = null;
    state.selectedChat = action.payload;
  });

  builder.addCase(fetchChats.fulfilled, (state, action) => {
    state.chats = [];
    state.chats = action.payload;
  });

  builder.addCase(createGroup.fulfilled, (state, action) => {
    console.log('action.payload: ^^^^createGroup', action.payload);
    state.chats = [...state.chats, action.payload];
  });
});

export default chatReducer;
