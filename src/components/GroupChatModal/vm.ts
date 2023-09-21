import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { UserSession } from '../../db/auth/types';
import { selectChats } from '../../db/chat/selector';
import { createGroup, searchUser } from '../../db/chat/thunk-request';
import { useAppDispatch } from '../../db/types';

export interface VMProps {
  onClose: () => void;
}

export default function useGroupChatModalVM({ onClose: handleCloseModal }: VMProps) {
  const dispatch = useAppDispatch();

  const [groupName, setGroupName] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<UserSession['user'][]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserSession['user'][]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleDelete = (delUser: UserSession['user']) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
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

  const handleGroup = (userToAdd: UserSession['user']) => {
    if (selectedUsers.includes(userToAdd)) {
      alert('User Already Added');
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!groupName || !selectedUsers) {
      alert('Please fill all the feilds');
      return;
    }

    try {
      const selectedUsersId = selectedUsers.map((u) => u._id);
      await dispatch(
        createGroup({
          name: groupName,
          users: selectedUsersId,
        }),
      );
      handleCloseModal();
      alert('New Group Chat Created!');
    } catch (error) {
      alert('Failed to Create the Chat!');
    }
  };

  return {
    groupName,
    handleChange,
    handleSubmit,
    handleUserSearch,
    searchResult,
    loading,
    handleGroup,
    selectedUsers,
    handleDelete,
  };
}
