import { randomUUID } from 'node:crypto';
import { forms, responses } from '../store/db';
import { Form, Question, CreateFormInput } from '../types';

export const createFormService = (input: CreateFormInput): Form => {
  const { title, description, questions } = input;

  if (!title.trim()) {
    throw new Error('Title is required');
  }

  if (!questions.length) {
    throw new Error('Form must contain at least one question');
  }

  const preparedQuestions: Question[] = questions.map((q) => {
    if (!q.title.trim()) {
      throw new Error('Question title is required');
    }

    if (
      (q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX') &&
      (!q.options || q.options.length === 0)
    ) {
      throw new Error('Options are required for choice-based questions');
    }

    if (typeof q.required !== 'boolean') {
      throw new Error('Question required flag must be boolean');
    }

    return {
      id: randomUUID(),
      title: q.title,
      type: q.type,
      options: q.options,
      required: q.required,
    };
  });

  const newForm: Form = {
    id: randomUUID(),
    title,
    description,
    questions: preparedQuestions,
  };

  forms.push(newForm);

  return newForm;
};

export const deleteFormService = (id: string): boolean => {
  const formIndex = forms.findIndex((f) => f.id === id);

  if (formIndex === -1) {
    throw new Error('Form not found');
  }

  forms.splice(formIndex, 1);

  for (let i = responses.length - 1; i >= 0; i--) {
    if (responses[i].formId === id) {
      responses.splice(i, 1);
    }
  }

  return true;
};

