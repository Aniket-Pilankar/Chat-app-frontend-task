import React, { ChangeEvent, KeyboardEventHandler, useCallback, useEffect, useState } from 'react';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  CircularProgress,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DefaultEventsMap } from '@socket.io/component-emitter';

import io, { Socket } from 'socket.io-client';

import { getMessagesById, sendMessageRequest } from '../../db/chat/thunk-request';
import { API } from '../../db/shared/api-response';
import { useAppDispatch } from '../../db/types';
import { getSender } from '../../utils/helper';
import ScrollableChat from '../ScrollableChat';
import UpdateGroupChatModal from '../UpdateGroupChatModal';
import { StyledStack, StyledWrapper } from './styles';
import useSingleChatVMProps from './vm';

const ENDPOINT = 'http://localhost:4001';
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

interface Props {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleChat = ({ fetchAgain, setFetchAgain }: Props) => {
  const dispatch = useAppDispatch();

  const { selectedChat, user, open, handleClose, handleOpen } = useSingleChatVMProps();

  const [messages, setMessages] = useState<API.SendMessageResponse[] | API.IFetchMessagesById>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);

  const typingHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;
  };

  const fetchMessages = useCallback(async () => {
    if (!selectedChat) return;

    try {
      const data = await dispatch(getMessagesById({ chatId: selectedChat._id })).unwrap();

      setLoading(true);

      setMessages(data);

      // socket.emit('join chat', selectedChat._id);
    } catch (error) {
      console.log('error:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, selectedChat]);

  const sendMessage: KeyboardEventHandler<HTMLDivElement> = async (event) => {
    if (!selectedChat) {
      alert('chartIs is not present');
      return;
    }
    if (event.key === 'Enter' && newMessage) {
      try {
        setNewMessage('');
        console.log('newMessage:', newMessage);
        console.log('selectedChat._id:', selectedChat._id);
        const data = await dispatch(
          sendMessageRequest({
            content: newMessage,
            chatId: selectedChat._id,
          }),
        ).unwrap();
        // socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log('error:', error);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, selectedChat]);

  useEffect(() => console.log(messages), [messages]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    console.log(user?._id);
    socket.on('connected', () => setSocketConnected(true));

    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   socket.on('message recieved', (newMessageRecieved) => {
  //     setMessages([...messages, newMessageRecieved]);
  //   });
  // });

  if (!selectedChat) return <Typography variant="h5">Click on a user to start chatting</Typography>;

  return (
    <>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography>
          {selectedChat?.isGroupChat
            ? selectedChat.chatName.toUpperCase()
            : getSender(user, selectedChat.users)}
        </Typography>
        {selectedChat?.isGroupChat && (
          <IconButton onClick={handleOpen}>
            <RemoveRedEyeIcon />
          </IconButton>
        )}
      </Stack>
      <StyledStack>
        {loading ? (
          <CircularProgress sx={{ alignSelf: 'center', margin: 'auto' }} />
        ) : (
          <StyledWrapper>
            <ScrollableChat messages={messages} />
          </StyledWrapper>
        )}
        <FormControl variant="filled" onKeyDown={sendMessage}>
          <TextField placeholder="Enter a message.." value={newMessage} onChange={typingHandler} />
        </FormControl>
      </StyledStack>
      <UpdateGroupChatModal
        isOpen={open}
        onClose={handleClose}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        fetchMessages={fetchMessages}
      />
    </>
  );
};

export default SingleChat;
