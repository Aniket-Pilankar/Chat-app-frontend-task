import React, { ReactNode } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Drawer as MuiDrawer, Typography } from '@mui/material';

import useDrawerVM, { Anchor } from './vm';

interface Props {
  anchor: Anchor;
  children: ReactNode;
}

const Drawer = ({ anchor, children }: Props) => {
  const { state, toggleDrawer } = useDrawerVM();

  const list = (anchor: Anchor, children: ReactNode) => (
    <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
      {children}
    </Box>
  );

  return (
    <React.Fragment key={anchor}>
      <Button onClick={toggleDrawer(anchor, true)}>
        {' '}
        <SearchIcon />
        <Typography>Search User</Typography>
      </Button>
      <MuiDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor, children)}
      </MuiDrawer>
    </React.Fragment>
  );
};

export default Drawer;
