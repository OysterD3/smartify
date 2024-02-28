import { useOpenAIStore } from './stores/openai.ts';
import Message from './components/Message.tsx';
import MessageInput from './components/MessageInput.tsx';
import MessageHistory from '@/components/MessageHistory.tsx';
import { createBEM } from '@/utils';
import './styles/index.scss';
import Sidebar from '@/components/Sidebar.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { useEffect, useRef } from 'react';

const bem = createBEM();

const ChatApp = () => {
  const { messages } = useOpenAIStore((state) => ({
    messages: state.messages,
  }));
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
    <div className={bem()}>
      <Sidebar />
      <main className={bem('main')}>
        <ScrollArea ref={chatRef}>
          <MessageHistory>
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
          </MessageHistory>
        </ScrollArea>
        <MessageInput />
      </main>
    </div>
  );
};

export default ChatApp;
