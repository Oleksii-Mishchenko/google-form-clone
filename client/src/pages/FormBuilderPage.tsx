import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setTitle,
  setDescription,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  resetFormBuilder,
} from '../features/formBuilder/formBuilderSlice';
import type { QuestionDraft } from '../types';
import { useCreateFormMutation } from '../app/api';

import QuestionCard from '../components/form-builder/QuestionCard';
import FormMeta from '../components/form-builder/FormMeta';
import Button from '../components/ui/Button';
import Header from '../components/form-builder/Header';

const FormBuilderPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { title, description, questions } = useAppSelector(
    (state) => state.formBuilder,
  );

  const [createForm, { isLoading }] = useCreateFormMutation();

  const isQuestionValid = (q: QuestionDraft): boolean => {
    if (!q.title.trim()) return false;

    if (q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX') {
      return q.options.some((opt) => opt.trim() !== '');
    }

    return true;
  };

  const isFormValid =
    title.trim().length > 0 &&
    questions.length > 0 &&
    questions.every(isQuestionValid);

  const handleAddQuestion = () => {
    const hasInvalid = questions.some((q) => !isQuestionValid(q));
    if (hasInvalid) return;

    const newQuestion: QuestionDraft = {
      id: crypto.randomUUID(),
      title: '',
      type: 'TEXT',
      options: [],
      required: false,
    };

    dispatch(addQuestion(newQuestion));
  };

  const canAddQuestion =
    questions.length === 0 || questions.every(isQuestionValid);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <Header />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormMeta
          title={title}
          description={description}
          onTitleChange={(value) => dispatch(setTitle(value))}
          onDescriptionChange={(value) => dispatch(setDescription(value))}
        />

        <section className="space-y-4">
          <div className="text-sm text-text-secondary">
            {questions.length} question{questions.length !== 1 && 's'}
          </div>

          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={i}
              isValid={isQuestionValid(q)}
              onChange={(updated) =>
                dispatch(updateQuestion({ id: q.id, question: updated }))
              }
              onDelete={() => dispatch(deleteQuestion(q.id))}
            />
          ))}
        </section>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            disabled={!canAddQuestion}
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>

          <Button
            type="submit"
            className="px-6"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? 'Creating...' : 'Save Form'}
          </Button>
        </div>
      </form>
    </div>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formattedQuestions = questions.map((q) => ({
      title: q.title,
      type: q.type,
      options:
        q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX'
          ? q.options.filter((opt) => opt.trim() !== '')
          : undefined,
      required: q.required,
    }));

    try {
      await createForm({
        title,
        description,
        questions: formattedQuestions,
      }).unwrap();

      dispatch(resetFormBuilder());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
};

export default FormBuilderPage;
