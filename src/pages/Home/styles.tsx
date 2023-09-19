import { Paper, styled } from '@mui/material'

export const Root = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
}))

export const StyledPaper = styled(Paper)(({ theme }) => ({
  minWidth: 120,
  minHeight: 120,
  padding: theme.spacing(2),
}))
