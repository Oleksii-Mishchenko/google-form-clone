export type QuestionDraft = {
  id: string;
  title: string;
  type: 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';
  options: string[];
  required: boolean;
};

export type Form = {
  id: string;
  title: string;
  description?: string | undefined;
  questions: {
    id: string;
    title: string;
    type: string;
    options?: string[] | undefined;
    required: boolean;
  }[];
};
