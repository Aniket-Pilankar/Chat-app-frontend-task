import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';

import { StyledForm } from './styles';
import useSignUpVM from './vm';

const SignUp = () => {
  const { handleChange, formData, handleClickShowPassword, showPassword } = useSignUpVM();

  return (
    <StyledForm>
      <TextField required name="name" value={formData.name} onChange={handleChange} label="Name" />
      <TextField
        required
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        label="Email"
      />

      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          onChange={handleChange}
          value={formData.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button variant="contained">Sign Up</Button>
    </StyledForm>
  );
};

export default SignUp;
