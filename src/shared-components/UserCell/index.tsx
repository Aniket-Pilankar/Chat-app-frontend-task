import React, { MouseEvent } from 'react';

import { Avatar, Typography } from '@mui/material';

import { UserSession } from '../../db/auth/types';
import { Root } from './styles';

interface Props {
  user: UserSession['user'];
  handleFunction: (e: MouseEvent<HTMLDivElement>) => void;
}

const UserCell = ({ user, handleFunction }: Props) => {
  return (
    <Root onClick={(e) => handleFunction(e)}>
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
