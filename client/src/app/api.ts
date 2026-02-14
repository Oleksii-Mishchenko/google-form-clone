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
        return { error: error.response.errors };
      }
      return { error: 'Unknown error' };
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery(),
  endpoints: (builder) => ({
    getForms: builder.query<
      { forms: { id: string; title: string; description?: string }[] },
      void
    >({
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
  }),
});

export const { useGetFormsQuery, useGetFormQuery } = api;
