import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { QuestionDraft } from '../types';

import QuestionCard from '../components/form-builder/QuestionCard';
import FormMeta from '../components/form-builder/FormMeta';
import Button from '../components/ui/Button';

const FormBuilderPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);

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

  const canAddQuestion =
    questions.length === 0 || questions.every(isQuestionValid);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <Link to="/" className="inline-block">
        <Button type="button" variant="ghost" className="cursor-pointer">
          ← Back to Forms
        </Button>
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Create New Form</h1>
        <p className="text-text-secondary">
          Add questions and configure your form settings.
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <FormMeta
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />

        <div className="space-y-4">
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
                setQuestions((prev) =>
                  prev.map((question) =>
                    question.id === q.id ? updated : question,
                  ),
                )
              }
              onDelete={() =>
                setQuestions((prev) =>
                  prev.filter((question) => question.id !== q.id),
                )
              }
            />
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            disabled={!canAddQuestion}
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>

          <Button className="px-6" type="submit">
            Save Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilderPage;
