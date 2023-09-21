import { RootState } from '../store';

export const selectSelectedChat = (state: RootState) => state.chats.selectedChat;
export const selectChats = (state: RootState) => state.chats.chats;
