import { useOpenAIStore } from '@/stores/openai.ts';
import MessageInput from '@/components/ChatRoom/MessageInput.tsx';
import MessageHistory from '@/components/ChatRoom/MessageHistory.tsx';
import ChatRoomPrompt from '@/components/ChatRoom/ChatRoomPrompt.tsx';
import { createBEM } from '@/utils';
import '@/styles/components/chat-room.scss';

const bem = createBEM('chat-room');

const ChatRoom = () => {
  const currentViewing = useOpenAIStore((state) => state.currentViewing);

  if (!currentViewing) {
    return null;
  }

  return (
    <div className={bem()}>
      <ChatRoomPrompt />
      <MessageHistory />
      <MessageInput />
    </div>
  );
};

export default ChatRoom;
