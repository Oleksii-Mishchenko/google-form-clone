type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const base =
  'px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary';

const variants: Record<Variant, string> = {
  primary: 'bg-primary hover:bg-primary-hover text-white shadow-md',
  secondary: 'bg-surface border border-border hover:bg-surface-hover',
  danger: 'bg-danger text-white hover:opacity-90 transition-opacity',
  ghost: 'text-primary hover:underline bg-transparent px-0 py-0',
};

const Button = ({ variant = 'primary', className = '', ...props }: Props) => (
  <button className={`${base} ${variants[variant]} ${className}`} {...props} />
);

export default Button;
