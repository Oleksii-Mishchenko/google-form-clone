import { Link } from 'react-router-dom';

import Button from '../ui/Button';

const Header = () => (
  <header className="space-y-8">
    <Link to="/" className="inline-block">
      <Button type="button" variant="ghost" className="cursor-pointer">
        ← Back to Forms
      </Button>
    </Link>

    <div className="space-y-2">
      <h1 className="text-3xl font-semibold">Create New Form</h1>
      <p className="text-text-secondary">
        Add questions and configure your form settings.
      </p>
    </div>
  </header>
);

export default Header;
