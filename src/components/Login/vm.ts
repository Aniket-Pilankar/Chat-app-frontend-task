import { useState } from 'react';

const initialState = {
  email: '',
  password: '',
};

export default function useLoginVM() {
  const [form, setForm] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { form, setForm, handleChange };
}
