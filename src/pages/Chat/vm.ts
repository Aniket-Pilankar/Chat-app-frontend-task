import { useSelector } from 'react-redux';

import { selectSession } from '../../db/auth/selector';

export default function useChatVM() {
  const session = useSelector(selectSession);

  return { session };
}
