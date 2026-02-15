export type QuestionType = 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: string[];
}

export interface Response {
  id: string;
  formId: string;
  answers: Answer[];
}

export interface CreateFormInput {
  title: string;
  description?: string;
  questions: {
    title: string;
    type: Question['type'];
    options?: string[];
    required: boolean;
  }[];
}

export interface SubmitResponseInput {
  formId: string;
  answers: {
    questionId: string;
    value: string[];
  }[];
}
