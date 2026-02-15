import type { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className = '', ...props }: Props) => (
  <textarea
    className={`w-full resize-none bg-surface border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    {...props}
  />
);

export default Textarea;
