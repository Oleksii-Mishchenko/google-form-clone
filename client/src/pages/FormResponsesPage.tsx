import { useParams } from 'react-router-dom';

import { useGetFormQuery, useGetResponsesQuery } from '../app/api';
import { getErrorMessage } from '../utils/getErrorMessage';

import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import Header from '../components/form-responses/Header';
import ResponseCard from '../components/form-responses/ResponseCard';

const FormResponsesPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: formData,
    isLoading: isFormLoading,
    error: formLoadingError,
  } = useGetFormQuery(id!, {
    skip: !id,
  });

  const {
    data: responsesData,
    isLoading: isResponsesLoading,
    error: responsesLoadingError,
  } = useGetResponsesQuery(id!, { skip: !id });

  if (isFormLoading || isResponsesLoading) return <Loader />;

  if (formLoadingError || responsesLoadingError) {
    const combinedError = formLoadingError || responsesLoadingError;

    return (
      <ErrorMessage
        message={getErrorMessage(combinedError)}
        backTo="/"
        backLabel="← Back to forms"
      />
    );
  }

  if (!formData?.form) {
    return (
      <ErrorMessage
        message="Form not found"
        backTo="/"
        backLabel="← Back to forms"
      />
    );
  }

  const { form } = formData;
  const responses = responsesData?.responses || [];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <Header title={form.title} totalResponses={responses.length} />

      {responses.length === 0 && (
        <div className="bg-surface border border-border rounded-xl p-6 text-text-secondary">
          No responses yet.
        </div>
      )}

      <section className="space-y-6">
        {responses.map((response, index) => (
          <ResponseCard
            key={response.id}
            response={response}
            form={form}
            index={index}
          />
        ))}
      </section>
    </div>
  );
};

export default FormResponsesPage;
