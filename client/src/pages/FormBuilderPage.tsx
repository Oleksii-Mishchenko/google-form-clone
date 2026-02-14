import { useState } from 'react';
import QuestionCard from '../components/form-builder/QuestionCard';
import FormMeta from '../components/form-builder/FormMeta';
import type { QuestionDraft } from '../types';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const FormBuilderPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);

  const handleAddQuestion = () => {
    const newQuestion: QuestionDraft = {
      id: crypto.randomUUID(),
      title: '',
      type: 'TEXT',
      options: [],
      required: false,
    };

    setQuestions((prev) => [...prev, newQuestion]);
  };

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

      <form className="space-y-6">
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

          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onChange={(updated) =>
                setQuestions((prev) =>
                  prev.map((question) =>
                    question.id === q.id ? updated : question,
                  ),
                )
              }
            />
          ))}
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="secondary" onClick={handleAddQuestion}>
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
