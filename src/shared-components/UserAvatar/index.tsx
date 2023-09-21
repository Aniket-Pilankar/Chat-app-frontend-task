import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Badge } from '@mui/material';

import { UserSession } from '../../db/auth/types';

interface Props {
  user: UserSession['user'];
  handleFunction: () => void;
  admin?: string;
}

const UserAvatar = ({ user, handleFunction, admin }: Props) => {
  return (
    <Badge
      sx={{
        padding: '8px 16px',
        marginBottom: '5px',
      }}
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon />
    </Badge>
  );
};

export default UserAvatar;
