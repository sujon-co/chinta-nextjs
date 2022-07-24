import { AxiosError } from 'axios';

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
    return (error as AxiosError).isAxiosError;
};

export type ErrorResponse = {
    non_field_errors?: string[];
    [x: string]: any;
};
