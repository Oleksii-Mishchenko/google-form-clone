import { Link } from 'react-router-dom';
import { useGetFormsQuery } from '../app/api';

const HomePage = () => {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading forms</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Forms</h1>
        <Link
          to="/forms/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create New Form
        </Link>
      </div>

      <div className="space-y-3">
        {data?.forms.map((form) => (
          <div
            key={form.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{form.title}</h2>
              {form.description && (
                <p className="text-sm text-gray-500">
                  {form.description}
                </p>
              )}
            </div>

            <div className="space-x-2">
              <Link
                to={`/forms/${form.id}/fill`}
                className="text-blue-600"
              >
                Fill
              </Link>
              <Link
                to={`/forms/${form.id}/responses`}
                className="text-green-600"
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
