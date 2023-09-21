import React, { ChangeEvent, KeyboardEventHandler, useEffect, useState } from 'react';

import { CircularProgress, FormControl, TextField, Typography } from '@mui/material';

import { getMessagesById, sendMessageRequest } from '../../db/chat/thunk-request';
import { API } from '../../db/shared/api-response';
import { useAppDispatch } from '../../db/types';
import { getSender } from '../../utils/helper';
import ScrollableChat from '../ScrollableChat';
import { StyledStack, StyledWrapper } from './styles';
import useSingleChatVMProps, { VMProps } from './vm';

interface Props extends VMProps {}

const SingleChat = ({ fetchAgain, setFetchAgain }: Props) => {
  const dispatch = useAppDispatch();

  const { selectedChat, user } = useSingleChatVMProps();

  const [messages, setMessages] = useState<API.SendMessageResponse[] | API.IFetchMessagesById>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const typingHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    // if (!socketConnected) return;

    // if (!typing) {
    //   setTyping(true);
    //   socket.emit("typing", selectedChat._id);
    // }
    // let lastTypingTime = new Date().getTime();
    // var timerLength = 3000;
    // setTimeout(() => {
    //   var timeNow = new Date().getTime();
    //   var timeDiff = timeNow - lastTypingTime;
    //   if (timeDiff >= timerLength && typing) {
    //     socket.emit("stop typing", selectedChat._id);
    //     setTyping(false);
    //   }
    // }, timerLength);
  };

  const fetchMessages = async () => {
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
  };

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
        // socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log('error:', error);
      }
    }
  };

  useEffect(() => {
    fetchMessages();

    // selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => console.log(messages), [messages]);

  if (!selectedChat) return <Typography variant="h5">Click on a user to start chatting</Typography>;

  return (
    <>
      <Typography>
        {selectedChat?.isGroupChat ? null : getSender(user, selectedChat.users)}
      </Typography>
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
    </>
  );
};

export default SingleChat;
