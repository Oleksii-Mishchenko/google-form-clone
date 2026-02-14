import { Link } from 'react-router-dom';

import Button from '../components/ui/Button';

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center px-6">
    <div className="text-center space-y-6 max-w-md">
      <div className="text-6xl font-bold text-primary">404</div>

      <h1 className="text-2xl font-semibold">Page not found</h1>

      <p className="text-text-secondary">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link to="/" className="inline-block">
        <Button type="button" className="cursor-pointer">
          Back to Forms
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
