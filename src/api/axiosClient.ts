import axios from 'axios';
import { useOpenAIStore } from '../stores/openai.ts';

export const axiosClient = axios.create({
  baseURL: 'https://api.openai.com/v1/',
});
export const useAxios = () => {
  const apiKey = useOpenAIStore.getState().apiKey;

  if (apiKey) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  return axiosClient;
};
