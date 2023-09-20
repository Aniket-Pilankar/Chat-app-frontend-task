import { ChangeEvent, useState } from 'react';

const initialState = {
  name: '',
  email: '',
  password: '',
};

export default function useSignUpVM() {
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

  return { handleChange, formData, handleClickShowPassword, showPassword };
}
