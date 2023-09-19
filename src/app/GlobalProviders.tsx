import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const GlobalProviders = ({ children }: Props) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

export default GlobalProviders
