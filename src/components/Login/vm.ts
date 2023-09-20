import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tryLogin } from '../../db/auth/thunk-request';
import { useAppDispatch } from '../../db/types';
import { routes } from '../../pages/routes';

const initialState = {
  email: '',
  password: '',
};

export default function useLoginVM() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);

    await dispatch(tryLogin(form));
    navigate(routes.chats);
  };

  return { form, setForm, handleChange, handleSubmit };
}
