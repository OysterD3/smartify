import { useOpenAIStore } from '@/stores/openai.ts';
import MessageInput from '@/components/ChatRoom/MessageInput.tsx';
import MessageHistory from '@/components/ChatRoom/MessageHistory.tsx';

const ChatRoom = () => {
  const currentViewing = useOpenAIStore((state) => state.currentViewing);

  if (!currentViewing) {
    return null;
  }

  return (
    <>
      <MessageHistory />
      <MessageInput />
    </>
  );
};

export default ChatRoom;
