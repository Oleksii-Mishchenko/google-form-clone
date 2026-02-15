import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { QuestionDraft } from '../types';
import { useCreateFormMutation } from '../app/api';

import QuestionCard from '../components/form-builder/QuestionCard';
import FormMeta from '../components/form-builder/FormMeta';
import Button from '../components/ui/Button';
import Header from '../components/form-builder/Header';

const FormBuilderPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);
  const navigate = useNavigate();

  const [createForm, { isLoading }] = useCreateFormMutation();

  const isQuestionValid = (q: QuestionDraft): boolean => {
    if (!q.title.trim()) return false;

    if (q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX') {
      return q.options.some((opt) => opt.trim() !== '');
    }

    return true;
  };

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

    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleChangeQuestion = (updated: QuestionDraft, id: string) => {
    setQuestions((prev) =>
      prev.map((question) => (question.id === id ? updated : question)),
    );
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
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
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
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
              onChange={(updated) => handleChangeQuestion(updated, q.id)}
              onDelete={() => handleDeleteQuestion(q.id)}
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

          <Button type="submit" className="px-6" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Save Form'}
          </Button>
        </div>
      </form>
    </div>
  );

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) return;
    if (!questions.length) return;

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

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
};

export default FormBuilderPage;
