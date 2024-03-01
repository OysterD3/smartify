import { useOpenAIStore } from '@/stores/openai.ts';
import { createBEM } from '@/utils';
import '@/styles/components/chat-room-prompt.scss';
import { Button } from '@/components/ui/button.tsx';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea.tsx';

const bem = createBEM('chat-room-prompt');

const ChatRoomPrompt = () => {
  const { prompt, setInitialPrompt } = useOpenAIStore((state) => ({
    prompt: state.chats[state.currentViewing].initialPrompt,
    setInitialPrompt: state.setInitialPrompt,
  }));
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleSetInitialPrompt = () => {
    if (inputRef.current) {
      setInitialPrompt(inputRef.current.value);
      setIsEditing(false);
    }
  };

  return (
    <div className={bem()}>
      {isEditing && (
        <Textarea
          defaultValue={prompt}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSetInitialPrompt();
            }
          }}
        />
      )}
      {!isEditing && (
        <p className={bem('prompt')}>
          <strong>Prompt: </strong>
          <span>{prompt}</span>
        </p>
      )}
      <div className={bem('actions')}>
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSetInitialPrompt}>Save</Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Pencil2Icon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatRoomPrompt;
