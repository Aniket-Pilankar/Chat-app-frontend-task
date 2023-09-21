import { createAction } from '@reduxjs/toolkit';

import { SelectedChat } from '../types';

export const selectedChatCreateAction = createAction<SelectedChat>('chat/selected/createAction');
