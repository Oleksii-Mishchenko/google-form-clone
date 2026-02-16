import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const baseStyles = 'focus:outline-none focus:ring-2 focus:ring-primary';

const textStyles =
  'w-full bg-surface border border-border rounded-lg px-3 py-2';

const choiceStyles = 'accent-primary';

const Input = ({ type = 'text', className = '', ...props }: InputProps) => {
  const isChoice = type === 'checkbox' || type === 'radio';

  const styles = isChoice
    ? `${choiceStyles} ${baseStyles}`
    : `${textStyles} ${baseStyles}`;

  return <input type={type} className={`${styles} ${className}`} {...props} />;
};

export default Input;
