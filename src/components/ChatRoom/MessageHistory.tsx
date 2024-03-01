import { createBEM } from '@/utils';
import '@/styles/components/message-history.scss';
import { useOpenAIStore } from '@/stores/openai.ts';
import Message from '@/components/ChatRoom/Message.tsx';
import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

const bem = createBEM('message-history');

const MessageHistory = () => {
  const { currentViewing, chats } = useOpenAIStore((state) => ({
    currentViewing: state.currentViewing,
    chats: state.chats,
  }));
  const messages = chats[currentViewing].messages;
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
    <ScrollArea className={bem()} ref={chatRef}>
      <ul className={bem('list')}>
        {messages.map((message, index) =>
          message.role === 'system' ? null : (
            <Message
              key={index}
              type={message.role === 'user' ? 'sent' : 'received'}
              content={message.content}
              token={message.tokens}
              model={message.model}
            />
          ),
        )}
      </ul>
    </ScrollArea>
  );
};

export default MessageHistory;
