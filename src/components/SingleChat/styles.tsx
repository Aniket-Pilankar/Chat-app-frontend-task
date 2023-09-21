import { Stack, StackProps, styled } from '@mui/material';

export const StyledStack = styled((props: StackProps) => (
  <Stack gap={1} justifyContent={'flex-end'} {...props} />
))(({ theme }) => ({
  padding: theme.spacing(1),
  width: '100%',
  height: '100%',
  overflowY: 'hidden',
  backgroundColor: '#E8E8E8',
}));

export const StyledWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
}));
