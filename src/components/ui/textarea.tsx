import * as React from 'react';
import { cn, createBEM } from '@/utils';
import '@/styles/ui/textarea.scss';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const bem = createBEM('textarea');

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return <textarea className={cn(bem(), className)} ref={ref} {...props} />;
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
