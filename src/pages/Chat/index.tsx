import { Navigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import Header from '../../components/Header';
import MyChatList from '../../components/MyChatList';
import { routes } from '../routes';
import useChatVM from './vm';

const Chat = () => {
  const { session } = useChatVM();

  if (!session) return <Navigate to={routes.home} />;

  const { user } = session;

  return (
    <div>
      {user && <Header />}
      <Stack width={'30%'}>{user && <MyChatList />}</Stack>
    </div>
  );
};

export default Chat;
