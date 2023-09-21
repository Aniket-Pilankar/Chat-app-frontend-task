import { Box, Paper, Stack, StackProps, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  padding: theme.spacing(2),
  width: '100%',
}));

export const StyledStack = styled((props: StackProps) => <Stack gap={1} {...props} />)(
  ({ theme }) => ({}),
);

export const StyledBox = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  padding: theme.spacing(1, 0.5),
  borderRadius: theme.spacing(0.5),
}));
