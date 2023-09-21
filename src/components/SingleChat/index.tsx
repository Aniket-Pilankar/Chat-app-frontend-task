import React from 'react';

import { Typography } from '@mui/material';

import { getSender } from '../../utils/helper';
import { StyledStack } from './styles';
import useSingleChatVMProps, { VMProps } from './vm';

interface Props extends VMProps {}

const SingleChat = ({ fetchAgain, setFetchAgain }: Props) => {
  const { selectedChat, user } = useSingleChatVMProps();
  if (!selectedChat) return <Typography variant="h5">Click on a user to start chatting</Typography>;
  return (
    <>
      <Typography>
        {selectedChat?.isGroupChat ? null : getSender(user, selectedChat.users)}
      </Typography>
      <StyledStack>{/* MEssage here */}</StyledStack>
    </>
  );
};

export default SingleChat;
