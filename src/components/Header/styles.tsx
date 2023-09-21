import { Stack, StackProps, styled } from '@mui/material';

export const Root = styled((props: StackProps) => <Stack gap={2} direction={'row'} {...props} />)(
  ({ theme }) => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: theme.spacing(1, 2),
  }),
);
