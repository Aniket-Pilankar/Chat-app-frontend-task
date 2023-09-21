import SingleChat from '../SingleChat';
import { StyledPaper } from './styles';
import { VMProps } from './vm';

interface Props extends VMProps {}

const Chatbox = ({ fetchAgain, setFetchAgain }: Props) => {
  return (
    <StyledPaper>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </StyledPaper>
  );
};

export default Chatbox;
