import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type GraphQLErrorShape = {
  errors?: { message?: string }[];
  message?: string;
};

export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return 'An unexpected error occurred.';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && error !== null) {
    if ('data' in error) {
      const fetchError = error as FetchBaseQueryError;

      if (typeof fetchError.data === 'object' && fetchError.data !== null) {
        const data = fetchError.data as GraphQLErrorShape;

        if (data.errors?.[0]?.message) {
          return data.errors[0].message;
        }

        if (data.message) {
          return data.message;
        }
      }
    }

    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
  }

  return 'An unexpected error occurred.';
};
