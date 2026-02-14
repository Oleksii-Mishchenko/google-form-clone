type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ className = '', ...props }: Props) => (
  <input
    type="checkbox"
    className={`accent-primary focus:ring-2 focus:ring-primary ${className}`}
    {...props}
  />
);

export default Checkbox;
