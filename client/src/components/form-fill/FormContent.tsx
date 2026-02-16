import type { Form } from '../../types';
import { getErrorMessage } from '../../utils/getErrorMessage';

import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import Input from '../ui/Input';

interface FormContentProps {
  form: Form;
  answers: Record<string, string[]>;
  isSubmitting: boolean;
  submitError: unknown;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  updateAnswer: (
    questionId: string,
    value: string[] | ((prev: string[]) => string[]),
  ) => void;
}

const FormContent = ({
  form,
  answers,
  isSubmitting,
  submitError,
  onSubmit,
  updateAnswer,
}: FormContentProps) => (
  <form onSubmit={onSubmit} className="space-y-6">
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
              const selected = answers[q.id] || [];
              const isChecked = selected.includes(option);

              return (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Input
                    type="checkbox"
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

    <Button type="submit" disabled={isSubmitting}>
      Submit
    </Button>
    {!!submitError && <ErrorMessage message={getErrorMessage(submitError)} />}
  </form>
);

export default FormContent;
