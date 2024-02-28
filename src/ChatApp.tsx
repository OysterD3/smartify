import { createBEM } from '@/utils';
import './styles/index.scss';
import Sidebar from '@/components/Sidebar.tsx';
import ChatRoom from '@/components/ChatRoom';

const bem = createBEM();

const ChatApp = () => {
  return (
    <div className={bem()}>
      <Sidebar />
      <main className={bem('main')}>
        <ChatRoom />
      </main>
    </div>
  );
};

export default ChatApp;
