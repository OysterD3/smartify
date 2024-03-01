import { useOpenAIStore } from '@/stores/openai.ts';
import MessageInput from '@/components/ChatRoom/MessageInput.tsx';
import MessageHistory from '@/components/ChatRoom/MessageHistory.tsx';
import ChatRoomPrompt from '@/components/ChatRoom/ChatRoomPrompt.tsx';

const ChatRoom = () => {
  const currentViewing = useOpenAIStore((state) => state.currentViewing);

  if (!currentViewing) {
    return null;
  }

  return (
    <>
      <ChatRoomPrompt />
      <MessageHistory />
      <MessageInput />
    </>
  );
};

export default ChatRoom;
