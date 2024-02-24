import { Card, CardContent } from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useFormContext } from 'react-hook-form';
import type { SettingsSchema } from '@/components/SettingsDialog/index.tsx';
import { useGetModelsQuery } from '@/api/models.ts';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';

const AISettings = () => {
  const { control, getValues, trigger, resetField } =
    useFormContext<SettingsSchema>();
  const [tempApiKey, setTempApiKey] = useState(getValues('apiKey'));
  const models = useGetModelsQuery({
    apiKey: tempApiKey,
    enabled: !!tempApiKey,
  });

  useEffect(() => {
    if (models.isError) {
      toast.error('Invalid API Key', {
        id: 'ai-settings',
      });
    } else if (models.isLoading) {
      toast.loading('Validating', {
        id: 'ai-settings',
      });
    } else if (models.isSuccess) {
      toast.success('Valid API Key', {
        id: 'ai-settings',
      });
      // Reset state
      resetField('apiKey', { defaultValue: tempApiKey });
    }
  }, [models.isError, models.isLoading, models.isSuccess]);

  const handleValidate: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    const valid = await trigger('apiKey');
    if (valid) {
      setTempApiKey(getValues('apiKey'));
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 gap-4">
        <FormField
          render={({ field, fieldState: { isDirty } }) => (
            <div className="flex gap-2 items-end">
              <FormItem className="flex-1">
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input {...field} type="text" id="apiKey" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button
                onClick={handleValidate}
                disabled={(models.isSuccess && !isDirty) || !field.value}
              >
                Validate
              </Button>
            </div>
          )}
          name="apiKey"
          control={control}
        />
        <FormField
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select
                disabled={!models.data?.data}
                onValueChange={onChange}
                value={value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {(models.data?.data || []).map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.id}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          name="model"
          control={control}
        />
      </CardContent>
    </Card>
  );
};

export default AISettings;
