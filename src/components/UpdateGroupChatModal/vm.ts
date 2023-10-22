import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSession } from '../../db/auth/selector';
import { UserSession } from '../../db/auth/types';
import { selectChats, selectSelectedChat } from '../../db/chat/selector';
import { addToGroup, removeFromGroup, renameGroup, searchUser } from '../../db/chat/thunk-request';
import { useAppDispatch } from '../../db/types';

export interface VMProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
  fetchMessages: () => Promise<void>;
}

export default function useUpdateGroupChatModalVM({
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}: VMProps) {
  const dispatch = useAppDispatch();

  const [groupChatName, setGroupChatName] = useState('');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<UserSession['user'][]>([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const allChats = useSelector(selectChats);
  const selectedChat = useSelector(selectSelectedChat);

  const session = useSelector(selectSession)!;

  const user = session.user;

  const handleChangeGroupChatName = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupChatName(e.target.value);
  };

  const handleUserSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);

    if (!searchQuery) {
      return;
    }

    try {
      setLoading(true);
      const data = await dispatch(searchUser({ search: searchQuery })).unwrap();
      setSearchResult(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (user1: UserSession['user']) => {
    if (allChats.find((u) => u._id === user1._id)) {
      alert('"User Already in group!"');
      return;
    }

    if (selectedChat?.groupAdmin?._id !== user?._id) {
      alert('Only admins can add someone!');
      return;
    }

    try {
      setLoading(true);

      dispatch(addToGroup({ userId: user1._id, chatId: selectedChat._id })).unwrap();

      // setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      // setLoading(false);
    } catch (error) {
      alert('Error Occured');
      setLoading(false);
    }
    setGroupChatName('');
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    if (!selectedChat) return;

    try {
      setRenameLoading(true);

      dispatch(
        renameGroup({
          chatId: selectedChat._id,
          chatName: groupChatName,
        }),
      );

      setFetchAgain(!fetchAgain);
    } catch (error) {
      alert('Error Occured!');
    } finally {
      setRenameLoading(false);
    }
    setGroupChatName('');
  };

  const handleRemoveUserFromGroup = async (user1: UserSession['user']) => {
    if (!selectedChat) return;
    if (selectedChat?.groupAdmin?._id !== user._id && user1._id !== user._id) {
      alert('Only admins can remove someone!');
      return;
    }

    try {
      setLoading(true);

      dispatch(
        removeFromGroup({
          chatId: selectedChat._id,
          userId: user1._id,
          loggedInUserId: user._id,
        }),
      );
      setFetchAgain(!fetchAgain);
      fetchMessages();
    } catch (error) {
      alert('Error Occured!');
    } finally {
      setLoading(false);
    }
    setGroupChatName('');
  };

  return {
    handleUserSearch,
    selectedChat,
    handleChangeGroupChatName,
    groupChatName,
    searchResult,
    handleAddUser,
    handleRename,
    handleRemoveUserFromGroup,
  };
}
