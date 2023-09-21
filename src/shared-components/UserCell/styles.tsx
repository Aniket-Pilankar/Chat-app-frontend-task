import { Stack, StackProps, styled } from '@mui/material';

export const Root = styled((props: StackProps) => <Stack gap={2} direction="row" {...props} />)(
  ({ theme }) => ({
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    cursor: 'pointer',
  }),
);
