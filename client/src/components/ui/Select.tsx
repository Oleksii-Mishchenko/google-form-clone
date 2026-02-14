type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ className = '', ...props }: Props) => (
  <select
    className={`w-full bg-surface border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    {...props}
  />
);

export default Select;
