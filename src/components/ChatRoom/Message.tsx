import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import Marked from '@/components/Marked.tsx';
import { createBEM } from '@/utils';
import '@/styles/components/message.scss';

const bem = createBEM('message');

const ChatGPTAvatar = () => (
  <Avatar>
    <AvatarImage src="/chatgpt-logo.png" alt="ChatGPT" />
    <AvatarFallback>AI</AvatarFallback>
  </Avatar>
);

const UserAvatar = () => (
  <Avatar>
    <AvatarImage src="/avatar.jpg" alt="Image by catalyststuff on Freepik" />
    <AvatarFallback>Y</AvatarFallback>
  </Avatar>
);

const Message = ({
  type,
  content,
}: {
  type: 'sent' | 'received' | 'prompt';
  content: string;
}) => {
  return (
    <li className={bem()}>
      <Card>
        <CardHeader>
          <CardTitle>
            {type === 'sent' && <UserAvatar />}
            {type === 'received' && <ChatGPTAvatar />}
            <span>{type === 'sent' ? 'You' : 'ChatGPT'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Marked value={content} />
        </CardContent>
      </Card>
    </li>
  );
};

export default Message;
