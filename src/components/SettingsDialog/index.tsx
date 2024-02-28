import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import Prompt from '@/components/SettingsDialog/Prompt.tsx';
import { useOpenAIStore } from '@/stores/openai.ts';
import AISettings from '@/components/SettingsDialog/AISettings.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Form } from '@/components/ui/form.tsx';

const settingsSchema = z
  .object({
    prompt: z.string(),
    apiKey: z.string(),
    model: z.string(),
  })
  .required();

export type SettingsSchema = z.infer<typeof settingsSchema>;

const SettingsDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const {
    setApiKey,
    setDefaultInitialPrompt,
    apiKey,
    defaultInitialPrompt,
    selectedModel,
    setSelectedModel,
  } = useOpenAIStore((state) => ({
    setApiKey: state.setApiKey,
    setDefaultInitialPrompt: state.setDefaultInitialPrompt,
    apiKey: state.apiKey,
    defaultInitialPrompt: state.defaultInitialPrompt,
    selectedModel: state.selectedModel,
    setSelectedModel: state.setSelectedModel,
  }));

  const form = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      prompt:
        "You're a helpful assistant. You can answer questions, provide information, and help users accomplish tasks. You can also ask questions to clarify requests or gather more information.",
      apiKey,
      model: selectedModel,
    },
  });

  useEffect(() => {
    if (!defaultInitialPrompt || !apiKey || !selectedModel) {
      setOpen(true);
    }
  }, [apiKey, defaultInitialPrompt, selectedModel]);

  const handleSave = (values: SettingsSchema) => {
    setApiKey(values.apiKey);
    setDefaultInitialPrompt(values.prompt);
    setSelectedModel(values.model);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="settings" onSubmit={form.handleSubmit(handleSave)}>
            <Tabs defaultValue="ai">
              <TabsList>
                <TabsTrigger value="ai">AI Settings</TabsTrigger>
                <TabsTrigger value="prompt">Prompt</TabsTrigger>
              </TabsList>
              <TabsContent value="ai">
                <AISettings />
              </TabsContent>
              <TabsContent value="prompt">
                <Prompt />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
        <DialogFooter>
          <Button form="settings" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
