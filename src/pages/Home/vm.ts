import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSession } from '../../db/auth/selector';

export default function useHomeVM() {
  const [value, setValue] = useState(0);

  const session = useSelector(selectSession);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return { value, handleChange, session };
}
