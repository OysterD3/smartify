import { Card, CardContent } from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useFormContext } from 'react-hook-form';
import type { SettingsSchema } from '@/components/SettingsDialog/index.tsx';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';

const Prompt = () => {
  const { control } = useFormContext<SettingsSchema>();

  return (
    <Card>
      <CardContent>
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="prompt"
          control={control}
        />
      </CardContent>
    </Card>
  );
};

export default Prompt;
