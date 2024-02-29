import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useOpenAIStore } from '@/stores/openai.ts';
import { useEffect } from 'react';

const schema = z
  .object({
    title: z.string().min(1),
    id: z.string().min(1),
  })
  .required();

const EditChatTitleDialog = ({
  open,
  setOpen,
  defaultValues,
}: {
  open: boolean;
  setOpen: (data: boolean) => void;
  defaultValues: { title: string; id: string };
}) => {
  const setTitle = useOpenAIStore((state) => state.setTitle);
  const form = useForm<z.infer<typeof schema>>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { title: string; id: string }) => {
    setTitle(data);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open, form, defaultValues]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chat Title</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="edit-chat-title" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Chat title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="title"
              control={form.control}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form="edit-chat-title" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChatTitleDialog;
