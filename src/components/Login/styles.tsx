import { Stack, StackProps, styled } from '@mui/material'

export const StyledStack = styled((props: StackProps) => <Stack gap={10} {...props} />)(
  ({ theme }) => ({
    margin: theme.spacing(2, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
)
