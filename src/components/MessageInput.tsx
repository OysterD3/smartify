import { useOpenAIStore } from '../stores/openai.ts';
import { useChatCompletionMutation } from '../api/chat.ts';
import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { createBEM } from '@/utils';
import '@/styles/components/message-input.scss';

const bem = createBEM('message-input');

const MessageInput = () => {
  const { initialPrompt, messages, selectedModel, appendMessages } =
    useOpenAIStore((state) => ({
      initialPrompt: state.initialPrompt,
      messages: state.messages,
      selectedModel: state.selectedModel,
      appendMessages: state.appendMessages,
    }));
  const chatCompletions = useChatCompletionMutation();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async () => {
    const message = inputRef.current?.value;
    if (!message) return;
    const msgs = [...messages];
    if (messages.length < 1) {
      msgs.push({
        role: 'system',
        content: initialPrompt,
      });
    }
    inputRef.current!.value = '';
    const response = await chatCompletions.mutateAsync({
      model: selectedModel,
      messages: [
        ...messages,
        {
          role: 'user',
          content: message,
        },
      ],
    });
    appendMessages([
      {
        role: 'user',
        content: message,
      },
      response.choices[0].message,
    ]);
  };

  return (
    <div className={bem()}>
      <Textarea
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <Button type="submit" onClick={handleSendMessage}>
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
