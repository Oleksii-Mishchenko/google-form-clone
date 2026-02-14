import { createFormService } from '../services/form.service';
import { submitResponseService } from '../services/response.service';
import { forms, responses } from '../store/db';

export const resolvers = {
  Query: {
    forms: () => forms,
    form: (_: unknown, args: { id: string }) =>
      forms.find((f) => f.id === args.id) || null,
    responses: (_: unknown, args: { formId: string }) =>
      responses.filter((r) => r.formId === args.formId),
  },

  Mutation: {
    createForm: (_: unknown, args: any) => {
      return createFormService(args);
    },

    submitResponse: (_: unknown, args: any) => {
      return submitResponseService(args);
    },
  },
};
