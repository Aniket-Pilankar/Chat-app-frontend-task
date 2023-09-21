import React, { MouseEvent } from 'react';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import UserAvatar from '../../shared-components/UserAvatar';
import UserCell from '../../shared-components/UserCell';
import { style } from './styles';
import useGroupChatModalVM, { VMProps } from './vm';

interface Props extends VMProps {
  isModalOpen: boolean;
}

const GroupChatModal = ({ isModalOpen, onClose }: Props) => {
  const {
    groupName,
    handleChange,
    handleSubmit,
    handleUserSearch,
    searchResult,
    loading,
    selectedUsers,
    handleGroup,
    handleDelete,
  } = useGroupChatModalVM({ onClose });

  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Create Group Chat
          </Typography>
          <hr />
          <TextField required value={groupName} onChange={handleChange} label="Group Name" />
          <TextField required onChange={handleUserSearch} label="Search Other User" />
          <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
            {selectedUsers.map((u) => (
              <UserAvatar key={u._id} user={u} handleFunction={() => handleDelete(u)} />
            ))}
          </Box>
          {loading ? (
            <div>Loading...</div>
          ) : (
            searchResult?.slice(0, 4).map((user) => (
              <UserCell
                key={user._id}
                user={user}
                handleFunction={(event: MouseEvent<HTMLDivElement>) => {
                  event.stopPropagation();
                  handleGroup(user);
                }}
              />
            ))
          )}
          <Button type="submit">Create Chat</Button>
        </Box>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
