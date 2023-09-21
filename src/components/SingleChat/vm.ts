import { useSelector } from 'react-redux';

import { selectSession } from '../../db/auth/selector';
import { selectSelectedChat } from '../../db/chat/selector';

export interface VMProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useSingleChatVMProps() {
  const selectedChat = useSelector(selectSelectedChat);
  const session = useSelector(selectSession);

  const user = session?.user;

  console.log('selectedChat:', selectedChat);
  return { selectedChat, user };
}
