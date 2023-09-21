import React from 'react';

import { Avatar, Typography } from '@mui/material';

import { UserSession } from '../../db/auth/types';
import { Root } from './styles';

interface Props {
  user: UserSession['user'];
  handleFunction: () => void;
}

const UserCell = ({ user, handleFunction }: Props) => {
  return (
    <Root component="button" onClick={handleFunction}>
      <Avatar alt={user.name} src={user.pic} />
      <div>
        <Typography>{user.name}</Typography>
        <Typography variant="body1">
          <b>Email : </b>
          {user.email}
        </Typography>
      </div>
    </Root>
  );
};

export default UserCell;
