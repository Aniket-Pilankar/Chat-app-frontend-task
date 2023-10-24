import { Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(5),
}));
