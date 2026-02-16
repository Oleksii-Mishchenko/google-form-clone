import type { Form, Response } from '../../types';

interface ResponseCardProps {
  response: Response;
  form: Form;
  index: number;
}

const ResponseCard = ({ response, form, index }: ResponseCardProps) => (
  <article className="bg-surface border border-border rounded-xl p-6 space-y-4">
    <h3 className="font-medium">Response #{index + 1}</h3>

    {response.answers.map((answer) => {
      const question = form.questions.find((q) => q.id === answer.questionId);

      return (
        <div key={answer.questionId}>
          <p className="text-sm text-text-secondary">{question?.title}</p>
          <p className="font-medium">{answer.value.join(', ')}</p>
        </div>
      );
    })}
  </article>
);

export default ResponseCard;
