import { createBEM } from '@/utils';
import { useOpenAIStore } from '@/stores/openai.ts';
import { Pencil2Icon } from '@radix-ui/react-icons';

const bem = createBEM('chat-list-item');

const ChatListItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const currentViewing = useOpenAIStore((state) => state.currentViewing);

  return (
    <li className={bem()} data-value-id={id}>
      <div
        role="button"
        className={bem('btn', { selected: id === currentViewing })}
      >
        <span>{children}</span>
        <Pencil2Icon
          className={bem('icon', { selected: id === currentViewing })}
          data-edit-id={id}
        />
      </div>
    </li>
  );
};

export default ChatListItem;
