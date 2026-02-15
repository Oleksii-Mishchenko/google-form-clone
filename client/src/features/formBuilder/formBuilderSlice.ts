import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { QuestionDraft } from '../../types';

interface FormBuilderState {
  title: string;
  description: string;
  questions: QuestionDraft[];
}

const initialState: FormBuilderState = {
  title: '',
  description: '',
  questions: [],
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },

    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },

    addQuestion(state, action: PayloadAction<QuestionDraft>) {
      state.questions.push(action.payload);
    },

    updateQuestion(
      state,
      action: PayloadAction<{ id: string; question: QuestionDraft }>,
    ) {
      const index = state.questions.findIndex(
        (q) => q.id === action.payload.id,
      );

      if (index !== -1) {
        state.questions[index] = action.payload.question;
      }
    },

    deleteQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },

    resetFormBuilder() {
      return initialState;
    },
  },
});

export const {
  setTitle,
  setDescription,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  resetFormBuilder,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
