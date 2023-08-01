import { RequestConfig, RequestError } from '../request';

export type SendFn = (...args: any) => any;

export type Query = {
  send: SendFn;
  config: RequestConfig;
};

export type Data<T extends SendFn> = Awaited<ReturnType<T>>;
export type Variables<T extends SendFn> = Parameters<T>[0];
export type Err<T extends SendFn> = RequestError<Data<T>>;
