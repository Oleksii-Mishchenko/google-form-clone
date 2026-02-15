import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { request, ClientError } from 'graphql-request';

const graphqlBaseQuery =
  (): BaseQueryFn<
    { document: string; variables?: Record<string, unknown> },
    unknown,
    unknown
  > =>
  async ({ document, variables }) => {
    try {
      const result = await request(
        'http://localhost:4000/graphql',
        document,
        variables,
      );
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return {
          error: {
            status: error.response.status,
            data: {
              errors: error.response.errors,
            },
          },
        };
      }

      return {
        error: {
          status: 500,
          data: {
            message: 'Unknown error occurred',
          },
        },
      };
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Forms', 'Responses'],
  endpoints: (builder) => ({
    getForms: builder.query<
      { forms: { id: string; title: string; description?: string }[] },
      void
    >({
      providesTags: ['Forms'],
      query: () => ({
        document: `
          query {
            forms {
              id
              title
              description
            }
          }
        `,
      }),
    }),

    getForm: builder.query<
      {
        form: {
          id: string;
          title: string;
          description?: string;
          questions: {
            id: string;
            title: string;
            type: string;
            options?: string[];
            required: boolean;
          }[];
        };
      },
      string
    >({
      query: (id) => ({
        document: `
          query ($id: ID!) {
            form(id: $id) {
              id
              title
              description
              questions {
                id
                title
                type
                options
                required
              }
            }
          }
        `,
        variables: { id },
      }),
    }),

    getResponses: builder.query<
      {
        responses: {
          id: string;
          formId: string;
          answers: { questionId: string; value: string[] }[];
        }[];
      },
      string
    >({
      providesTags: (_result, _error, formId) => [
        { type: 'Responses', id: formId },
      ],
      query: (formId) => ({
        document: `
          query GetResponses($formId: ID!) {
            responses(formId: $formId) {
              id
              formId
              answers {
                questionId
                value
              }
            }
          }
        `,
        variables: { formId },
      }),
    }),

    createForm: builder.mutation<
      { createForm: { id: string } },
      {
        title: string;
        description?: string;
        questions: {
          title: string;
          type: string;
          options?: string[];
          required: boolean;
        }[];
      }
    >({
      query: (variables) => ({
        document: `
          mutation CreateForm(
            $title: String!
            $description: String
            $questions: [QuestionInput!]!
          ) {
            createForm(
              title: $title
              description: $description
              questions: $questions
            ) {
              id
            }
          }
        `,
        variables,
      }),
      invalidatesTags: ['Forms'],
    }),

    deleteForm: builder.mutation<
      { deleteForm: boolean },
      string
    >({
      query: (id) => ({
        document: `
          mutation DeleteForm($id: ID!) {
            deleteForm(id: $id)
          }
        `,
        variables: { id },
      }),
      invalidatesTags: ['Forms'],
    }),

    submitResponse: builder.mutation<
      { submitResponse: { id: string } },
      { formId: string; answers: { questionId: string; value: string[] }[] }
    >({
      invalidatesTags: (_result, _error, { formId }) => [
        { type: 'Responses', id: formId },
      ],
      query: ({ formId, answers }) => ({
        document: `
          mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
            submitResponse(formId: $formId, answers: $answers) {
              id
            }
          }
        `,
        variables: { formId, answers },
      }),
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useDeleteFormMutation,
  useSubmitResponseMutation,
} = api;
