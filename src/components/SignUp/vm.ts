import { ChangeEvent, FormEvent, useState } from 'react';

import { trySignIn } from '../../db/auth/thunk-request';
import { useAppDispatch } from '../../db/types';

const initialState = {
  name: '',
  email: '',
  password: '',
};

export default function useSignUpVM() {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('formData', formData);

    await dispatch(trySignIn(formData));
  };

  return {
    handleChange,
    formData,
    handleClickShowPassword,
    showPassword,
    handleSubmit,
  };
}
