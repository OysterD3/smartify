import ChatApp from './ChatApp.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <ChatApp />
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
