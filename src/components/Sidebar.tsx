import { createBEM, getElementAttribute } from '@/utils';
import SettingsDialog from '@/components/SettingsDialog';
import { useState } from 'react';
import { GearIcon } from '@radix-ui/react-icons';

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
      <div className="flex-1 h-full"></div>
      <ul className="flex flex-col" onClick={handleBottomItemClick}>
        <li
          className="flex items-center gap-2 cursor-pointer px-2 py-4"
          data-item="settings"
        >
          <GearIcon />
          <span>Settings</span>
        </li>
      </ul>
      <SettingsDialog open={open} setOpen={setOpen} />
    </aside>
  );
};

export default Sidebar;
