import React from 'react';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { style } from './styles';
import useGroupChatModalVM from './vm';

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
}

const GroupChatModal = ({ isModalOpen, onClose: handleCloseModal }: Props) => {
  const { groupName, handleChange, handleSubmit } = useGroupChatModalVM();

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
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
          <TextField required value={groupName} onChange={handleChange} label="Search Other User" />
        </Box>
        <Button type="submit">Create Chat</Button>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
