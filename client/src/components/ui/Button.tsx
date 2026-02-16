import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base = `
  px-4 py-2 rounded-lg transition-colors
  focus:outline-none focus:ring-2 focus:ring-primary
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
`;

const variants: Record<Variant, string> = {
  primary: 'bg-primary hover:bg-primary-hover text-white shadow-md',
  secondary: 'bg-surface border border-border hover:bg-surface-hover',
  danger: 'bg-danger text-white hover:opacity-90 transition-opacity',
  ghost: 'text-primary hover:underline bg-transparent px-0 py-0',
};

const Button = ({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => (
  <button className={`${base} ${variants[variant]} ${className}`} {...props} />
);

export default Button;
