import { useState } from 'react';

export default function useHomeVM() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return { value, handleChange };
}
