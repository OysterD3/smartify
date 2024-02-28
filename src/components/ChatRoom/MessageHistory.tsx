import { createBEM } from '@/utils';
import '@/styles/components/message-history.scss';
import { useOpenAIStore } from '@/stores/openai.ts';
import Message from '@/components/ChatRoom/Message.tsx';
import { useEffect, useRef } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const bem = createBEM('message-history');

const MessageHistory = () => {
  const messages = useOpenAIStore(
    (state) => state.chats[state.currentViewing].messages,
  );
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight + 999;
    }
  }, [messages]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight + 999;
    }
  }, []);

  return (
    <ScrollArea ref={chatRef}>
      <ul className={bem()}>
        {messages.map((message, index) =>
          message.role === 'system' ? null : (
            <Message
              key={index}
              position={message.role === 'user' ? 'sent' : 'received'}
            >
              {message.content}
            </Message>
          ),
        )}
      </ul>
    </ScrollArea>
  );
};

export default MessageHistory;
