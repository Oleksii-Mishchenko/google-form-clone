import { useGetFormsQuery } from '../app/api';
import { getErrorMessage } from '../utils/getErrorMessage';

import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import FormCard from '../components/home/FormCard';
import EmptyState from '../components/home/EmptyState';
import Header from '../components/home/Header';

const HomePage = () => {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <ErrorMessage message={getErrorMessage(error)} />
      </div>
    );
  }

  const forms = data?.forms ?? [];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <Header hasForms={!!forms.length} />

      {forms.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {forms.map((form) => (
            <FormCard
              key={form.id}
              id={form.id}
              title={form.title}
              description={form.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
