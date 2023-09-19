import React from 'react'

import { Paper, Tab, Tabs } from '@mui/material'

import TabPanel from '../../shared-components/TabPanel'
import { Root, StyledPaper } from './styles'
import useHomeVM from './vm'

const Home = () => {
  const { handleChange, value } = useHomeVM()

  return (
    <Root>
      <StyledPaper>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="SignUp" />
        </Tabs>
        <TabPanel value={value} index={0}>
          A
        </TabPanel>
        <TabPanel value={value} index={1}>
          B
        </TabPanel>
      </StyledPaper>
    </Root>
  )
}

export default Home
