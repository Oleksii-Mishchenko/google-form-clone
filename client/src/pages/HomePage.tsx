import { useState } from "react";

type QuestionDraft = {
  id: string;
  title: string;
  type: 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';
  options: string[];
  required: boolean;
};

const FormBuilderPage = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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
    <form className="flex flex-col space-y-3">
      <div className="flex flex-col space-y-2">
        <label>
          <input
            type="text"
            name="title"
            className="border border-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <textarea
            name="description"
            className="border border-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button
          type="button"
          onClick={handleAddQuestion}
          className="border border-black"
        >
          Add Question
        </button>

        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="border p-3">
              <input
                type="text"
                value={q.title}
                onChange={(e) =>
                  setQuestions((prev) =>
                    prev.map((question) =>
                      question.id === q.id
                        ? { ...question, title: e.target.value }
                        : question
                    )
                  )
                }
                className="border border-black w-full"
              />
            </div>
          ))}
        </div>

      </div>

      <button
        type="submit"
        className="border border-black"
      >
        Save Form
      </button>
    </form>
  );
};

export default FormBuilderPage;
