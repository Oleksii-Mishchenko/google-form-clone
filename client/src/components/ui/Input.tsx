type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className = '', ...props }: Props) => (
  <input
    className={`w-full bg-surface border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    {...props}
  />
);

export default Input;
