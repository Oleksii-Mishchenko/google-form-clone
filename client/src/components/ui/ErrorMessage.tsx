import { Link } from 'react-router-dom';

import Button from './Button';

interface ErrorMessageProps {
  message?: string;
  backTo?: string;
  backLabel?: string;
}

const ErrorMessage = ({
  message,
  backTo,
  backLabel = 'Go back',
}: ErrorMessageProps) => (
  <div className="max-w-4xl mx-auto bg-surface border border-danger rounded-xl p-6 space-y-4 text-center">
    <h2 className="text-lg font-semibold text-danger">Something went wrong</h2>

    <p className="text-text-secondary">
      {message || 'An unexpected error occurred. Please try again.'}
    </p>

    {backTo && (
      <Link to={backTo}>
        <Button variant="secondary" className="cursor-pointer">
          {backLabel}
        </Button>
      </Link>
    )}
  </div>
);

export default ErrorMessage;
