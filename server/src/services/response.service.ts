import { randomUUID } from 'node:crypto';
import { responses, forms, Answer, Response, Question } from '../store/db';

interface SubmitResponseInput {
  formId: string;
  answers: {
    questionId: string;
    value: string[];
  }[];
}

const normalizeValues = (values: string[], questionTitle: string): string[] => {
  const trimmed = values.map((v) => v.trim());

  if (trimmed.some((v) => !v.length)) {
    throw new Error(`Answer for question "${questionTitle}" is empty`);
  }

  return trimmed;
};

const validateAnswer = (question: Question, values: string[]): void => {
  if (!values.length) {
    throw new Error(`Question "${question.title}" is required`);
  }

  if (question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX') {
    if (!question.options) {
      throw new Error(`Options are missing for question "${question.title}"`);
    }

    values.forEach((val) => {
      if (!question.options!.includes(val)) {
        throw new Error(
          `Invalid option "${val}" for question "${question.title}"`,
        );
      }
    });
  }

  if (
    question.type === 'TEXT' ||
    question.type === 'DATE' ||
    question.type === 'MULTIPLE_CHOICE'
  ) {
    if (values.length !== 1) {
      throw new Error(
        `Only one answer is allowed for question "${question.title}"`,
      );
    }
  }

  if (question.type === 'CHECKBOX' && values.length < 1) {
    throw new Error(
      `At least one option must be selected for question "${question.title}"`,
    );
  }
};

export const submitResponseService = (input: SubmitResponseInput): Response => {
  const { formId, answers } = input;

  const form = forms.find((f) => f.id === formId);

  if (!form) {
    throw new Error('The corresponding form was not found');
  }

  if (!answers.length) {
    throw new Error("You didn't give any answer");
  }

  const questionsMap = new Map(form.questions.map((q) => [q.id, q]));
  const answeredIds = new Set(answers.map((a) => a.questionId));
  const requiredQuestions = form.questions.filter((q) => q.required);

  requiredQuestions.forEach((q) => {
    if (!answeredIds.has(q.id)) {
      throw new Error(`Required question "${q.title}" is missing`);
    }
  });

  const preparedAnswers: Answer[] = answers.map((answer) => {
    const question = questionsMap.get(answer.questionId);

    if (!question) {
      throw new Error('Question was not found');
    }

    const normalized = normalizeValues(answer.value, question.title);

    validateAnswer(question, normalized);

    return {
      questionId: answer.questionId,
      value: normalized,
    };
  });

  const newResponse: Response = {
    id: randomUUID(),
    formId,
    answers: preparedAnswers,
  };

  responses.push(newResponse);

  return newResponse;
};
