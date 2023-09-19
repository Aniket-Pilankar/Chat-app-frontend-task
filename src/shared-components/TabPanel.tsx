import React, { ReactNode } from 'react'

import { Stack } from '@mui/material'

interface Props {
  children: ReactNode
  value: number
  index: number
}

const TabPanel = ({ children, value, index }: Props) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Stack sx={{ p: 3 }}>{children}</Stack>}
    </div>
  )
}

export default TabPanel
