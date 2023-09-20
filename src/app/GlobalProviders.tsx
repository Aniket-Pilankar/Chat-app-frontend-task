import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../db/store';

interface Props {
  children: ReactNode;
}

const GlobalProviders = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

export default GlobalProviders;
