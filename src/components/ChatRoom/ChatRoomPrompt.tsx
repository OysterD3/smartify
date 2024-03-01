import { useOpenAIStore } from '@/stores/openai.ts';
import { createBEM } from '@/utils';
import '@/styles/components/chat-room-prompt.scss';
import { Button } from '@/components/ui/button.tsx';
import { Pencil2Icon } from '@radix-ui/react-icons';

const bem = createBEM('chat-room-prompt');

const ChatRoomPrompt = () => {
  const prompt = useOpenAIStore(
    (state) => state.chats[state.currentViewing].initialPrompt,
  );

  return (
    <div className={bem()}>
      <p className={bem('prompt')}>
        <strong>Prompt: </strong>
        <span>{prompt}</span>
      </p>
      <div className={bem('actions')}>
        <Button variant="ghost" size="icon">
          <Pencil2Icon />
        </Button>
      </div>
    </div>
  );
};

export default ChatRoomPrompt;
