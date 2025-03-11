export interface IResponse<T = undefined> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: { page: number; limit: number };
  stack?: string;
  errorSources?: { path: string; message: string }[];
}

export type IErrorResponse<T = undefined> = Omit<IResponse<T>, 'data'>;
