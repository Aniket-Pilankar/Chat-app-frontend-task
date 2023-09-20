import React from 'react';

import { Button, TextField } from '@mui/material';

import { StyledStack } from './styles';
import useLoginVM from './vm';

const Login = () => {
  const { form, handleChange } = useLoginVM();

  return (
    <StyledStack>
      <TextField
        required
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        label="Email"
      />
      <TextField
        required
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button variant="contained">Log In</Button>
    </StyledStack>
  );
};

export default Login;
