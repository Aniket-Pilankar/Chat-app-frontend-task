import { MouseEvent } from 'react';

import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';

import UserAvatar from '../../shared-components/UserAvatar';
import UserCell from '../../shared-components/UserCell';
import { style } from './styles';
import useUpdateGroupChatModalVM, { VMProps } from './vm';

interface Props extends VMProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateGroupChatModal = ({
  isOpen,
  onClose,
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}: Props) => {
  const {
    handleUserSearch,
    selectedChat,
    handleChangeGroupChatName,
    groupChatName,
    searchResult,
    handleRename,
    handleAddUser,
    handleRemoveUserFromGroup,
  } = useUpdateGroupChatModalVM({ fetchAgain, setFetchAgain, fetchMessages });
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {selectedChat?.chatName}
        </Typography>
        <div>
          {selectedChat?.users.map((user) => (
            <UserAvatar
              key={user._id}
              user={user}
              handleFunction={() => handleRemoveUserFromGroup(user)}
            />
          ))}
        </div>
        <Stack direction="row" gap={2}>
          <TextField
            value={groupChatName}
            onChange={handleChangeGroupChatName}
            label="Group Name"
          />
          <Button onClick={handleRename}>Update</Button>
        </Stack>
        <div>
          <TextField onChange={handleUserSearch} label="Add user to Group" />
        </div>
        <div>
          {/* 
          {loading ? (
            <div>Loading...</div>
          ) : ( */}
          {searchResult?.map((user) => (
            <UserCell
              key={user._id}
              user={user}
              handleFunction={(event: MouseEvent<HTMLDivElement>) => {
                event.stopPropagation();
                handleAddUser(user);
              }}
            />
          ))}
          {/* )} */}
        </div>
      </Box>
    </Modal>
  );
};

export default UpdateGroupChatModal;
