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
    hello: builder.query<{ hello: string }, void>({
      query: () => ({
        document: `
          query {
            hello
          }
        `,
      }),
    }),
  }),
});

export const { useHelloQuery } = api;
