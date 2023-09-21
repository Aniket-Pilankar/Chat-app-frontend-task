import './App.css';

import { Route, Routes } from 'react-router-dom';

import Chat from './pages/Chat';
import Home from './pages/Home';
import { routes } from './pages/routes';

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.chats} element={<Chat />} />
    </Routes>
  );
}

export default App;
