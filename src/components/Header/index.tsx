import React from 'react';
import { Navigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import useHomeVM from '../../pages/Home/vm';
import { routes } from '../../pages/routes';
import Drawer from '../../shared-components/Drawer';
import UserCell from '../../shared-components/UserCell';
import { Root } from './styles';
import useHeaderVM from './vm';

const Header = () => {
  const {
    handleClick,
    handleClose,
    open,
    loading,
    session,
    setSearch,
    search,
    handleSearch,
    searchResult,
    anchorEl,
    handleLogout,
    accessChat,
    loadingChat,
  } = useHeaderVM();

  if (!session) return <Navigate to={routes.home} />;

  const { user } = session;

  return (
    <Root>
      {user ? (
        <Drawer anchor="left">
          <Box display="flex" p={2}>
            <TextField
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => {
                e.stopPropagation();
                setSearch(e.target.value);
              }}
            />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          {loading ? (
            '...Loading'
          ) : (
            <Stack gap={2}>
              {searchResult?.map((user) => (
                <UserCell key={user._id} user={user} handleFunction={accessChat(user._id)} />
              ))}
            </Stack>
          )}
          {loadingChat && (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
        </Drawer>
      ) : null}
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Avatar src={user.pic} alt={user.name} />
          <Typography variant="body1">{user.email}</Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>{' '}
    </Root>
  );
};

export default Header;
