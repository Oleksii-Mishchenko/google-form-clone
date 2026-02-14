import { useState } from 'react';

type QuestionDraft = {
  id: string;
  title: string;
  type: 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';
  options: string[];
  required: boolean;
};

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
    <div className="p-8 max-w-3xl mx-auto">
      <form className="space-y-6">
        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <input
            type="text"
            placeholder="Form title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            placeholder="Form description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <input
                type="text"
                placeholder="Question title"
                value={q.title}
                onChange={(e) =>
                  setQuestions((prev) =>
                    prev.map((question) =>
                      question.id === q.id
                        ? { ...question, title: e.target.value }
                        : question,
                    ),
                  )
                }
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-surface border border-border hover:bg-surface-hover transition-colors px-4 py-2 rounded-lg"
          >
            Add Question
          </button>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover transition-colors text-white px-6 py-2 rounded-lg shadow-md"
          >
            Save Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilderPage;
