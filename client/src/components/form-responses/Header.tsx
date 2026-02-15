import { Link } from 'react-router-dom';

import Button from '../ui/Button';

type Props = {
  totalResponses: number;
  title: string;
};

const Header = ({ totalResponses, title }: Props) => (
  <header className="space-y-8">
    <Link className="inline-block" to="/">
      <Button variant="ghost">← Back to Forms</Button>
    </Link>

    <div>
      <h1 className="text-3xl font-semibold">Responses: {title}</h1>
      <p className="text-text-secondary">
        {totalResponses} response
        {totalResponses !== 1 && 's'}
      </p>
    </div>
  </header>
);

export default Header;
