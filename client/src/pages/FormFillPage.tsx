import { useParams } from 'react-router-dom';

import { useFormAnswers } from '../hooks/useFormAnswers';
import { getErrorMessage } from '../utils/getErrorMessage';
import { useGetFormQuery, useSubmitResponseMutation } from '../app/api';

import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import SuccessState from '../components/form-fill/SuccessState';
import Header from '../components/form-fill/Header';
import FormContent from '../components/form-fill/FormContent';

const FormFillPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading: isFormLoading,
    error: fetchError,
  } = useGetFormQuery(id!, {
    skip: !id,
  });

  const [
    submitResponse,
    { isLoading: isSubmitting, isSuccess, error: submitError },
  ] = useSubmitResponseMutation();

  const { answers, updateAnswer } = useFormAnswers();

  if (isFormLoading || isSubmitting) return <Loader />;

  if (fetchError || submitError) {
    const combinedError = fetchError || submitError;

    return (
      <ErrorMessage
        message={getErrorMessage(combinedError)}
        backTo="/"
        backLabel="← Back to forms"
      />
    );
  }

  if (!data?.form) {
    return (
      <ErrorMessage
        message="Form not found"
        backTo="/"
        backLabel="← Back to forms"
      />
    );
  }

  if (isSuccess) return <SuccessState />;

  const { form } = data;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <Header title={form.title} description={form.description} />
      <FormContent
        form={form}
        answers={answers}
        updateAnswer={updateAnswer}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </div>
  );

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!id) return;

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, value]) => ({
        questionId,
        value,
      }),
    );

    try {
      await submitResponse({
        formId: id,
        answers: formattedAnswers,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  }
};

export default FormFillPage;
