import { createBEM, getElementAttribute } from '@/utils';
import SettingsDialog from '@/components/SettingsDialog';
import { useState } from 'react';
import { GearIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import '@/styles/components/sidebar.scss';
import ChatList from '@/components/Sidebar/ChatList.tsx';

const bem = createBEM('sidebar');
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleBottomItemClick: React.MouseEventHandler<HTMLUListElement> = (
    e,
  ) => {
    const data = getElementAttribute(e, 'data-item');
    if (data === 'settings') {
      setOpen(true);
    }
  };

  return (
    <aside className={bem()}>
      <ScrollArea className={bem('chat-list')}>
        <ChatList />
      </ScrollArea>
      <ul className={bem('system-list')} onClick={handleBottomItemClick}>
        <li className={bem('system-list-item')} data-item="settings">
          <GearIcon />
          <span>Settings</span>
        </li>
      </ul>
      <SettingsDialog open={open} setOpen={setOpen} />
    </aside>
  );
};

export default Sidebar;
