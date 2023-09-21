import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';

import { Avatar } from '@mui/material';

import { selectSession } from '../../db/auth/selector';
import { API } from '../../db/shared/api-response';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../utils/helper';

interface Props {
  messages: API.SendMessageResponse[] | API.IFetchMessagesById;
}

const ScrollableChat = ({ messages }: Props) => {
  const session = useSelector(selectSession);

  const user = session?.user!;

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: 'flex' }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
              <Avatar sx={{ cursor: 'pointer' }} alt={m.sender.name} src={m.sender.pic} />
            )}
            <span
              style={{
                backgroundColor: `${m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'}`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
