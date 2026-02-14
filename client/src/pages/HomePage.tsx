import { Link } from 'react-router-dom';
import { useGetFormsQuery } from '../app/api';
import Button from '../components/ui/Button';

const HomePage = () => {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) {
    return <div className="p-8 text-text-secondary">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-danger">Error loading forms</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Forms</h1>

        <Link to="/forms/new">
          <Button
            type="button"
            className="px-5 py-2.5 rounded-xl cursor-pointer"
          >
            Create New Form
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {data?.forms.length === 0 && (
          <div className="text-text-secondary">No forms created yet.</div>
        )}

        {data?.forms.map((form) => (
          <div
            key={form.id}
            className="bg-surface border border-border rounded-xl p-5 flex justify-between items-center hover:bg-surface-hover transition-colors"
          >
            <div>
              <h2 className="text-lg font-medium">{form.title}</h2>

              {form.description && (
                <p className="text-sm text-text-secondary mt-1">
                  {form.description}
                </p>
              )}
            </div>

            <div className="flex gap-4 text-sm">
              <Link
                to={`/forms/${form.id}/fill`}
                className="text-primary hover:underline"
              >
                Fill
              </Link>

              <Link
                to={`/forms/${form.id}/responses`}
                className="text-success hover:underline"
              >
                Responses
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
