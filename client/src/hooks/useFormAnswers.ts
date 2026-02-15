import { useState } from 'react';

export type AnswersState = Record<string, string[]>;

export const useFormAnswers = () => {
  const [answers, setAnswers] = useState<AnswersState>({});

  const updateAnswer = (
    questionId: string,
    updater: string[] | ((prev: string[]) => string[]),
  ) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];

      const newValues =
        typeof updater === 'function' ? updater(current) : updater;

      return {
        ...prev,
        [questionId]: newValues,
      };
    });
  };

  return {
    answers,
    updateAnswer,
  };
};
