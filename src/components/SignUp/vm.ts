import { ChangeEvent, FormEvent, useState } from 'react';

import { trySignIn } from '../../db/auth/thunk-request';
import { useAppDispatch } from '../../db/types';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../pages/routes';

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

    try {
      const response = await dispatch(trySignIn(formData)).unwrap();
      alert(`${formData.name} your account has been created. Please login In`);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleChange,
    formData,
    handleClickShowPassword,
    showPassword,
    handleSubmit,
  };
}
