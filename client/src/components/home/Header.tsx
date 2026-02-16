import { Link } from 'react-router-dom';

import Button from '../ui/Button';

interface HeaderProps {
  hasForms: boolean;
}

const Header = ({ hasForms }: HeaderProps) => (
  <header className="flex justify-between items-center">
    <h1 className="text-3xl font-semibold">Forms</h1>

    {hasForms && (
      <Link to="/forms/new">
        <Button type="button" className="px-5 py-2.5 rounded-xl cursor-pointer">
          Create New Form
        </Button>
      </Link>
    )}
  </header>
);

export default Header;
