import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSession } from '../../db/auth/selector';
import { selectSelectedChat } from '../../db/chat/selector';

export default function useSingleChatVMProps() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selectedChat = useSelector(selectSelectedChat);
  const session = useSelector(selectSession);

  const user = session?.user;

  console.log('selectedChat:', selectedChat);
  return { selectedChat, user, open, handleClose, handleOpen };
}
