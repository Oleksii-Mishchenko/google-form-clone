import { Link } from 'react-router-dom';

import Button from '../ui/Button';

type Props = {
  id: string;
  title: string;
  description?: string | null;
};

const FormCard = ({ id, title, description }: Props) => (
  <article className="bg-surface border border-border rounded-xl p-5 flex justify-between items-center hover:bg-surface-hover transition-colors">
    <div>
      <h2 className="text-lg font-medium">{title}</h2>

      {description && (
        <p className="text-sm text-text-secondary mt-1">{description}</p>
      )}
    </div>

    <div className="flex gap-3">
      <Link to={`/forms/${id}/fill`}>
        <Button variant="ghost" className="cursor-pointer">
          Fill
        </Button>
      </Link>

      <Link to={`/forms/${id}/responses`}>
        <Button variant="secondary" className="cursor-pointer">
          Responses
        </Button>
      </Link>
    </div>
  </article>
);

export default FormCard;
