export const resolvers = {
  Query: {
    forms: () => [],
    form: () => null,
    responses: () => [],
  },
  Mutation: {
    createForm: () => {
      throw new Error('Not implemented');
    },
    submitResponse: () => {
      throw new Error('Not implemented');
    },
  },
};
