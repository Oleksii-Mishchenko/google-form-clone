import { useParams, Link } from 'react-router-dom';

import { useGetFormQuery } from '../app/api';
import { useFormAnswers } from '../hooks/useFormAnswers';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const FormFillPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetFormQuery(id!, {
    skip: !id,
  });
  const { answers, updateAnswer } = useFormAnswers();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error || !data?.form) {
    return (
      <div className="p-8 space-y-8">
        <Link to="/" className="inline-block">
          <Button variant="ghost" className="cursor-pointer">
            ← Back
          </Button>
        </Link>

        <p className="text-danger">Form not found</p>
      </div>
    );
  }

  const { form } = data;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <Link to="/" className="inline-block">
        <Button type="button" variant="ghost" className="cursor-pointer">
          ← Back to Forms
        </Button>
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{form.title}</h1>
        {form.description && (
          <p className="text-text-secondary">{form.description}</p>
        )}
      </div>

      <form className="space-y-6">
        {form.questions.map((q, index) => (
          <div
            key={q.id}
            className="bg-surface border border-border rounded-xl p-5 space-y-3"
          >
            <h3 className="font-medium">
              {index + 1}. {q.title}
              {q.required && <span className="text-danger ml-1">*</span>}
            </h3>

            {q.type === 'TEXT' && (
              <Input
                value={answers[q.id]?.[0] || ''}
                onChange={(e) => updateAnswer(q.id, [e.target.value])}
              />
            )}

            {q.type === 'DATE' && (
              <Input
                type="date"
                value={answers[q.id]?.[0] || ''}
                onChange={(e) => updateAnswer(q.id, [e.target.value])}
              />
            )}

            {q.type === 'MULTIPLE_CHOICE' && (
              <div className="space-y-2">
                {q.options?.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={answers[q.id]?.[0] === option}
                      onChange={() => updateAnswer(q.id, [option])}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'CHECKBOX' && (
              <div className="space-y-2">
                {q.options?.map((option) => {
                  const selectedValues = answers[q.id] || [];
                  const isChecked = selectedValues.includes(option);

                  return (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Input
                        type="checkbox"
                        value={option}
                        checked={isChecked}
                        onChange={() =>
                          updateAnswer(q.id, (prev) =>
                            prev.includes(option)
                              ? prev.filter((v) => v !== option)
                              : [...prev, option],
                          )
                        }
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <Button type="submit" disabled>
          Submit (coming soon)
        </Button>
      </form>
    </div>
  );
};

export default FormFillPage;
