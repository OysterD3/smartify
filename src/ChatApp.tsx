import { useOpenAIStore } from './stores/openai.ts';
import Message from './components/Message.tsx';
import MessageInput from './components/MessageInput.tsx';
import MessageHistory from '@/components/MessageHistory.tsx';
import { createBEM } from '@/utils';
import './styles/index.scss';
import Sidebar from '@/components/Sidebar.tsx';

const bem = createBEM();

const ChatApp = () => {
  const { messages } = useOpenAIStore((state) => ({
    messages: state.messages,
  }));

  return (
    <div className={bem()}>
      <Sidebar />
      <main className={bem('main')}>
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
        <MessageInput />
      </main>
    </div>
  );
};

export default ChatApp;
