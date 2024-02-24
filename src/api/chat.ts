import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useAxios } from './axiosClient.ts';
import { useMutation } from '@tanstack/react-query';

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

type ChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices: {
    index: number;
    message: Message;
    logprobs: null;
    finish_reason: string;
  }[];
  usage: Usage;
};

export const useChatCompletionMutation = () => {
  const axiosClient = useAxios();

  return useMutation({
    mutationFn: async (body: { messages: Message[]; model: string }) => {
      const resp = await axiosClient.post<ChatCompletionResponse>(
        '/chat/completions',
        body,
      );
      return resp.data;
    },
  });
};
