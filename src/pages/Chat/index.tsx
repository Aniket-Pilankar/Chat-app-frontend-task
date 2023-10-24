import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import Chatbox from '../../components/Chatbox';
import Header from '../../components/Header';
import MyChatList from '../../components/MyChatList';
import { routes } from '../routes';
import useChatVM from './vm';

const Chat = () => {
  const { session } = useChatVM();

  // so if group is deleted then there should , then the name of the group should also deleted from the chatList
  const [fetchAgain, setFetchAgain] = useState(false);

  if (!session?.token) return <Navigate to={routes.home} />;

  const { user } = session;

  return (
    <div style={{ height: '100%' }}>
      {user && <Header />}
      <Stack width={'100%'} height={'100%'} direction={'row'} gap={3}>
        {user && <MyChatList fetchAgain={fetchAgain} />}
        {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Stack>
    </div>
  );
};

export default Chat;
