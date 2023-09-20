import { Tab, Tabs } from '@mui/material';

import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
import TabPanel from '../../shared-components/TabPanel';
import { Root, StyledPaper } from './styles';
import useHomeVM from './vm';

const Home = () => {
  const { handleChange, value } = useHomeVM();

  return (
    <Root>
      <StyledPaper>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="SignUp" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp />
        </TabPanel>
      </StyledPaper>
    </Root>
  );
};

export default Home;
