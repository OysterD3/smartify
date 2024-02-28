import { create } from 'zustand';
import type { Message } from '../api/chat.ts';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';

interface OpenAIStore {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  messages: Message[];
  appendMessages: (messages: Message[]) => void;
  initialPrompt: string;
  setInitialPrompt: (prompt: string) => void;
  setMessageContent: (
    data: (messages: Message[]) => { index: number; content: string },
  ) => void;
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
      messages: [],
      appendMessages: (messages) =>
        set((state) => ({ messages: [...state.messages, ...messages] })),
      initialPrompt: '',
      setInitialPrompt: (initialPrompt) => set({ initialPrompt }),
      setMessageContent: (data) =>
        set((state) => {
          const { index, content } = data(state.messages);
          state.messages[index].content = content;
          return { messages: state.messages };
        }),
    }),
    {
      name: 'openai-store',
      storage: createJSONStorage(() => persistentStore),
      version: 1,
    },
  ),
);
