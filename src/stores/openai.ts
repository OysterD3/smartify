import { create } from 'zustand';
import type { Message } from '../api/chat.ts';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';
import { nanoid } from 'nanoid';

interface Chat {
  title: string;
  messages: Message[];
  initialPrompt: string;
}

interface OpenAIStore {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  chats: Record<string, Chat>;
  initializeChat: () => void;
  currentViewing: string;
  setCurrentViewing: (id: string) => void;
  defaultInitialPrompt: string;
  setDefaultInitialPrompt: (prompt: string) => void;
  setInitialPrompt: (prompt: string) => void;
  setMessageContent: (
    data: (messages: Message[]) => { index: number; content: string },
  ) => void;
  appendMessages: (messages: Message[]) => void;
}

const persistentStore: StateStorage = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : undefined;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useOpenAIStore = create<OpenAIStore>()(
  persist(
    (set) => ({
      apiKey: '',
      setApiKey: (apiKey) => set({ apiKey }),
      selectedModel: '',
      setSelectedModel: (selectedModel) => set({ selectedModel }),
      chats: {},
      setInitialPrompt: (initialPrompt) =>
        set((state) => ({
          chats: {
            ...state.chats,
            [state.currentViewing]: {
              ...state.chats[state.currentViewing],
              initialPrompt,
            },
          },
        })),
      setDefaultInitialPrompt: (defaultInitialPrompt) =>
        set({ defaultInitialPrompt }),
      defaultInitialPrompt:
        "You're a helpful assistant. You can answer questions, provide information, and help users accomplish tasks. You can also ask questions to clarify requests or gather more information.",
      setMessageContent: (data) =>
        set((state) => {
          const { index, content } = data(
            state.chats[state.currentViewing].messages,
          );
          state.chats[state.currentViewing].messages[index].content = content;
          return {
            chats: {
              ...state.chats,
              [state.currentViewing]: {
                ...state.chats[state.currentViewing],
                messages: state.chats[state.currentViewing].messages,
              },
            },
          };
        }),
      currentViewing: '',
      setCurrentViewing: (id) => set({ currentViewing: id }),
      initializeChat: () =>
        set((state) => {
          const id = nanoid();
          state.chats[id] = {
            title: 'Untitled',
            messages: [],
            initialPrompt: state.defaultInitialPrompt,
          };
          return { chats: state.chats };
        }),
      appendMessages: (messages) =>
        set((state) => {
          state.chats[state.currentViewing].messages.push(...messages);
          return {
            chats: {
              ...state.chats,
              [state.currentViewing]: {
                ...state.chats[state.currentViewing],
                messages: state.chats[state.currentViewing].messages,
              },
            },
          };
        }),
    }),
    {
      name: 'openai-store',
      storage: createJSONStorage(() => persistentStore),
      version: 2,
    },
  ),
);
