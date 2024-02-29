import { useOpenAIStore } from '@/stores/openai.ts';
import { createBEM, getElementAttribute } from '@/utils';
import ChatListItem from '@/components/Sidebar/ChatListItem.tsx';
import '@/styles/components/chat-list.scss';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import EditChatTitleDialog from '@/components/Sidebar/EditChatTitleDialog.tsx';

const bem = createBEM('chat-list');

const ChatList = () => {
  const { chats, setCurrentViewing, initialiseChat } = useOpenAIStore(
    (state) => ({
      chats: state.chats,
      setCurrentViewing: state.setCurrentViewing,
      initialiseChat: state.initialiseChat,
    }),
  );

  const [editTitleDialog, setEditTitleDialog] = useState({
    open: false,
    id: '',
    title: '',
  });

  const handleClick: React.MouseEventHandler<HTMLUListElement> = (e) => {
    const editChatId = getElementAttribute(e, 'data-edit-id');
    if (editChatId) {
      setEditTitleDialog({
        open: true,
        id: editChatId,
        title: chats[editChatId].title,
      });
      console.log(editChatId, chats[editChatId].title);
      return;
    }

    const chatId = getElementAttribute(e, 'data-value-id');
    if (chatId) {
      setCurrentViewing(chatId);
      return;
    }

    const isNew = getElementAttribute(e, 'data-new');
    if (isNew) {
      initialiseChat();
    }
  };

  return (
    <>
      <ul className={bem()} onClick={handleClick}>
        <li>
          <Button variant="outline" data-new={true}>
            New chat
          </Button>
        </li>
        {Object.keys(chats).map((chatId) => (
          <ChatListItem id={chatId} key={chatId}>
            {chats[chatId].title}
          </ChatListItem>
        ))}
      </ul>
      <EditChatTitleDialog
        open={editTitleDialog.open}
        setOpen={(value) => {
          setEditTitleDialog({
            ...editTitleDialog,
            open: value,
          });
        }}
        defaultValues={{
          title: editTitleDialog.title,
          id: editTitleDialog.id,
        }}
      />
    </>
  );
};

export default ChatList;
