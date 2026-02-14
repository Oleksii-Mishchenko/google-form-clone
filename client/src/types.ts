export type QuestionDraft = {
  id: string;
  title: string;
  type: 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';
  options: string[];
  required: boolean;
};
