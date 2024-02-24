import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from './axiosClient.ts';

export const modelKeys = createQueryKeys('models', {
  getModels: null,
});

export type Model = {
  id: string;
  created: number;
  object: 'model';
  owned_by: 'system' | 'openai' | 'openai-internal';
};

export const useGetModelsQuery = ({
  enabled,
  apiKey,
}: {
  enabled?: boolean;
  apiKey?: string;
}) => {
  const axiosClient = useAxios();
  return useQuery({
    queryKey: modelKeys.getModels.queryKey,
    queryFn: async ({ signal }) => {
      const response = await axiosClient.get<{
        data: Model[];
      }>('/models', {
        signal,
        ...(apiKey ? { headers: { Authorization: `Bearer ${apiKey}` } } : {}),
      });
      return response.data;
    },
    enabled,
  });
};
