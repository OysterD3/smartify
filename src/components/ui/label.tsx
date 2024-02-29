import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn, createBEM } from '@/utils';
import '@/styles/ui/label.scss';

const bem = createBEM('label');

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(bem(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
