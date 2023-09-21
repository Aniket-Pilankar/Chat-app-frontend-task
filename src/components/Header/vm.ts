import { useState } from 'react';
import { useSelector } from 'react-redux';

import { trylogout } from '../../db/auth/actions';
import { selectSession } from '../../db/auth/selector';
import { clearSession } from '../../db/auth/session';
import { UserSession } from '../../db/auth/types';
import { accessChats, searchUser } from '../../db/chat/thunk-request';
import { useAppDispatch } from '../../db/types';

export default function useHeaderVM() {
  const session = useSelector(selectSession);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<UserSession['user'][]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('handleClose');
    clearSession();
    dispatch(trylogout());
    handleClose();
  };

  const accessChat = (userId: string) => () => {
    try {
      setLoadingChat(true);
      dispatch(accessChats({ userId }));
    } finally {
      setLoadingChat(false);
    }
  };

  const handleSearch = async () => {
    if (!search) {
      return;
    }

    try {
      setLoading(true);

      const data = await dispatch(searchUser({ search })).unwrap();

      setSearchResult(data);
    } catch (error) {
      console.log('error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
    loading,
    session,
    setSearch,
    search,
    handleSearch,
    searchResult,
    handleLogout,
    accessChat,
    loadingChat,
  };
}
