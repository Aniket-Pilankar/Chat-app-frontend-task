import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSession } from '../../db/auth/selector';
import { selectChats, selectSelectedChat } from '../../db/chat/selector';
import { fetchChats } from '../../db/chat/thunk-request';
import { useAppDispatch } from '../../db/types';

export default function useMyChatListVM() {
  const dispatch = useAppDispatch();

  const session = useSelector(selectSession);
  const allChats = useSelector(selectChats);
  const selectedChat = useSelector(selectSelectedChat);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const user = session?.user;

  useEffect(() => {
    (async () => {
      await dispatch(fetchChats());
    })();
  }, [dispatch]);

  return { allChats, selectedChat, user, handleModalOpen, handleCloseModal, isModalOpen };
}
