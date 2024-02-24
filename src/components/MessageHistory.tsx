import { createBEM } from '@/utils';
import '@/styles/components/message-history.scss';

const bem = createBEM('message-history');

const MessageHistory = ({ children }: { children: React.ReactNode }) => {
  return <ul className={bem()}>{children}</ul>;
};

export default MessageHistory;
