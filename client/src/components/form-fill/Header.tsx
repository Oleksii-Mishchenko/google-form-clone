import { Link } from 'react-router-dom';
import Button from '../ui/Button';

type Props = {
  title: string;
  description?: string;
};

const Header = ({ title, description }: Props) => (
  <>
    <Link to="/" className="inline-block">
      <Button type="button" variant="ghost" className="cursor-pointer">
        ← Back to Forms
      </Button>
    </Link>

    <div className="space-y-2">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {description && <p className="text-text-secondary">{description}</p>}
    </div>
  </>
);

export default Header;
