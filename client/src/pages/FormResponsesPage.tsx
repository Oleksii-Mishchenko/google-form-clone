import { useParams, Link } from 'react-router-dom';

import { useGetFormQuery, useGetResponsesQuery } from '../app/api';

import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';

const FormResponsesPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: formData, isLoading: isFormLoading } = useGetFormQuery(id!, {
    skip: !id,
  });

  const { data: responsesData, isLoading: isResponsesLoading } =
    useGetResponsesQuery(id!, { skip: !id });

  if (isFormLoading || isResponsesLoading) return <Loader />

  if (!formData?.form) {
    return (
      <div className="p-8 space-y-6">
        <Link to="/">
          <Button variant="ghost">← Back</Button>
        </Link>
        <p className="text-danger">Form not found</p>
      </div>
    );
  }

  const { form } = formData;
  const responses = responsesData?.responses || [];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <Link className="inline-block" to="/">
        <Button variant="ghost">← Back to Forms</Button>
      </Link>

      <div>
        <h1 className="text-3xl font-semibold">Responses: {form.title}</h1>
        <p className="text-text-secondary">
          {responses.length} response
          {responses.length !== 1 && 's'}
        </p>
      </div>

      {responses.length === 0 && (
        <div className="bg-surface border border-border rounded-xl p-6 text-text-secondary">
          No responses yet.
        </div>
      )}

      <div className="space-y-6">
        {responses.map((response, index) => (
          <div
            key={response.id}
            className="bg-surface border border-border rounded-xl p-6 space-y-4"
          >
            <h3 className="font-medium">Response #{index + 1}</h3>

            {response.answers.map((answer) => {
              const question = form.questions.find(
                (q) => q.id === answer.questionId,
              );

              return (
                <div key={answer.questionId}>
                  <p className="text-sm text-text-secondary">
                    {question?.title}
                  </p>
                  <p className="font-medium">{answer.value.join(', ')}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormResponsesPage;
