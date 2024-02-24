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

const Message = ({
  position,
  children,
}: {
  position: 'sent' | 'received';
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={position === 'sent' ? '/avatar.jpg' : '/chatgpt-logo.png'}
                alt={
                  position === 'sent'
                    ? 'Image by catalyststuff on Freepik'
                    : 'ChatGPT'
                }
              />
              <AvatarFallback>{position === 'sent' ? 'Y' : 'C'}</AvatarFallback>
            </Avatar>
            <span>{position === 'sent' ? 'You' : 'ChatGPT'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <p className="whitespace-pre-wrap">{children}</p>
        </CardContent>
      </Card>
    </li>
  );
};

export default Message;
