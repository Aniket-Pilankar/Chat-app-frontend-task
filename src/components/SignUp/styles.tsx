import { styled } from '@mui/material';

export const StyledForm = styled('form')(({ theme }) => ({
  margin: theme.spacing(2, 6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));
