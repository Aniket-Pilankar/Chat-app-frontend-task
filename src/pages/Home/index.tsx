import { Navigate } from 'react-router-dom';

import { Tab, Tabs } from '@mui/material';

import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
import TabPanel from '../../shared-components/TabPanel';
import { routes } from '../routes';
import { Root, StyledPaper } from './styles';
import useHomeVM from './vm';

const Home = () => {
  const { handleChange, value, session } = useHomeVM();

  if (session?.token) {
    return <Navigate to={routes.chats} />;
  }

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
