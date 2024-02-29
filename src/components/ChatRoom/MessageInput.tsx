import { useOpenAIStore } from '../../stores/openai.ts';
import {
  ChatCompletionResponse,
  useChatCompletionStreamMutation,
} from '../../api/chat.ts';
import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { createBEM, readAllChunks } from '@/utils';
import '@/styles/components/message-input.scss';
import { createParser } from 'eventsource-parser';

const bem = createBEM('message-input');

const MessageInput = () => {
  const {
    initialPrompt,
    messages,
    selectedModel,
    appendMessages,
    setMessageContent,
  } = useOpenAIStore((state) => ({
    initialPrompt: state.chats[state.currentViewing].initialPrompt,
    messages: state.chats[state.currentViewing].messages,
    selectedModel: state.selectedModel,
    appendMessages: state.appendMessages,
    setMessageContent: state.setMessageContent,
  }));
  const chatCompletions = useChatCompletionStreamMutation();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async () => {
    const message = inputRef.current?.value;
    if (!message) return;
    const msgs = [...messages];
    inputRef.current!.value = '';
    appendMessages([
      {
        role: 'user',
        content: message,
      },
    ]);
    const response = await chatCompletions.mutateAsync({
      model: selectedModel,
      messages: [
        {
          role: 'system',
          content: initialPrompt,
        },
        ...msgs,
        {
          role: 'user',
          content: message,
        },
      ],
    });
    appendMessages([
      {
        role: 'assistant',
        content: '',
      },
    ]);
    const parser = createParser((e) => {
      if (e.type === 'event' && e.data !== '[DONE]') {
        const data = JSON.parse(e.data) as ChatCompletionResponse;
        console.log(data);
        if (data.choices[0].finish_reason === 'stop') {
          return;
        }
        setMessageContent((messages) => {
          const lastMessage = messages[messages.length - 1];
          return {
            index: messages.length - 1,
            content: `${lastMessage.content}${data.choices[0].delta.content}`,
          };
        });
      }
    });
    for await (const completion of readAllChunks(response)) {
      parser.feed(completion);
    }
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
