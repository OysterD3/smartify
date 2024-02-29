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
    <li>
      <Card>
        <CardHeader className="pt-4 pb-2">
          <CardTitle className="flex items-center gap-4">
            {type === 'sent' && <UserAvatar />}
            {type === 'received' && <ChatGPTAvatar />}
            <span>{type === 'sent' ? 'You' : 'ChatGPT'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <Marked value={content} />
        </CardContent>
      </Card>
    </li>
  );
};

export default Message;
