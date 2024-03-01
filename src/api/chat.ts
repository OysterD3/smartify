import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation } from '@tanstack/react-query';
import { useOpenAIStore } from '@/stores/openai.ts';

export const chatKeys = createQueryKeys('chat', {
  chatCompletion: (params: { messages: string; model: string }) => [
    { ...params },
  ],
});

export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type ChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices: {
    index: number;
    logprobs: null;
    finish_reason: string;
    delta: {
      content: string;
    };
  }[];
  usage: Usage;
};

export const useChatCompletionStreamMutation = () => {
  return useMutation({
    mutationFn: async (body: { messages: Message[]; model: string }) => {
      const apiKey = useOpenAIStore.getState().apiKey;
      const response = await fetch(
        `https://api.openai.com/v1/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            ...body,
            stream: true,
          }),
        },
      );

      if (!response.ok || response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      if (!response.body) {
        throw new Error('Response body is empty');
      }

      return response.body;
    },
  });
};
