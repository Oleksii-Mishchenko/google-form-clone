import { Link } from 'react-router-dom';

import Button from '../ui/Button';

const EmptyState = () => (
  <div className="bg-surface border border-border rounded-xl p-10 text-center space-y-4">
    <h2 className="text-xl font-semibold">No forms yet</h2>

    <p className="text-text-secondary">
      Create your first form to start collecting responses.
    </p>

    <Link to="/forms/new">
      <Button className="cursor-pointer">Create First Form</Button>
    </Link>
  </div>
);

export default EmptyState;
