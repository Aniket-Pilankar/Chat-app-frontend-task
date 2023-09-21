import React from 'react';

import { Button, Paper, Stack, Typography } from '@mui/material';

import { getSender } from '../../utils/helper';
import GroupChatModal from '../GroupChatModal';
import { StyledBox, StyledStack } from './styles';
import useMyChatListVM, { VMProps } from './vm';

interface Props extends VMProps {}

const MyChatList = ({ fetchAgain }: Props) => {
  const {
    allChats,
    accessChat,
    selectedChat,
    user,
    handleCloseModal,
    handleModalOpen,
    isModalOpen,
  } = useMyChatListVM({ fetchAgain });
  return (
    <>
      <Paper elevation={3} sx={{ height: '100%', width: '400px', padding: '5px' }}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography>Chat List</Typography>
          <Button onClick={handleModalOpen}>Create Group</Button>
        </Stack>
        <StyledStack>
          {allChats.map((chat) => (
            <StyledBox
              sx={{
                backgroundColor: selectedChat === chat ? '#38B2AC' : '#E8E8E8',
                color: selectedChat === chat ? 'white' : 'black',
              }}
              onClick={accessChat(chat)}
            >
              <Typography variant="body1">
                {!chat.isGroupChat ? getSender(user, chat.users) : chat.chatName}
              </Typography>
              {/* {chat.latestMessage && (
              <Typography fontSize="xs">
                <b>{chat.latestMessage.sender.name} : </b>
                {chat.latestMessage.content.length > 50
                  ? chat.latestMessage.content.substring(0, 51) + '...'
                  : chat.latestMessage.content}
              </Typography>
            )} */}
            </StyledBox>
          ))}
        </StyledStack>
      </Paper>
      <GroupChatModal isModalOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default MyChatList;
