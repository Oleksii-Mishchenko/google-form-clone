import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const SuccessState = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6 text-center">
      <h1 className="text-3xl font-semibold text-success">Thank you!</h1>

      <p className="text-text-secondary">Your response has been submitted.</p>

      <Link to="/">
        <Button className="cursor-pointer">Back to Forms</Button>
      </Link>
    </div>
  );
};

export default SuccessState;
