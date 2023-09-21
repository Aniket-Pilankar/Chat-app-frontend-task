import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSession } from '../../db/auth/selector';
import { selectedChatCreateAction } from '../../db/chat/action';
import { selectChats, selectSelectedChat } from '../../db/chat/selector';
import { fetchChats } from '../../db/chat/thunk-request';
import { SelectedChat, useAppDispatch } from '../../db/types';

export interface VMProps {
  fetchAgain: boolean;
}

export default function useMyChatListVM({ fetchAgain }: VMProps) {
  const dispatch = useAppDispatch();

  const session = useSelector(selectSession);
  const allChats = useSelector(selectChats);
  const selectedChat = useSelector(selectSelectedChat);
  console.log('selectedChat:', selectedChat);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const user = session?.user;

  const accessChat = (chat: SelectedChat) => () => {
    dispatch(selectedChatCreateAction(chat));
  };

  useEffect(() => {
    (async () => {
      await dispatch(fetchChats());
    })();
  }, [dispatch, fetchAgain]);

  return {
    allChats,
    accessChat,
    selectedChat,
    user,
    handleModalOpen,
    handleCloseModal,
    isModalOpen,
  };
}
