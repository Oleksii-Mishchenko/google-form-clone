import { createFormService } from '../services/form.service';
import { submitResponseService } from '../services/response.service';
import { forms, responses } from '../store/db';
import { SubmitResponseInput, CreateFormInput } from '../types';

export const resolvers = {
  Query: {
    forms: () => forms,
    form: (_: unknown, args: { id: string }) =>
      forms.find((f) => f.id === args.id) || null,
    responses: (_: unknown, args: { formId: string }) =>
      responses.filter((r) => r.formId === args.formId),
  },

  Mutation: {
    createForm: (_: unknown, args: CreateFormInput) => {
      return createFormService(args);
    },

    submitResponse: (_: unknown, args: SubmitResponseInput) => {
      return submitResponseService(args);
    },
  },
};
