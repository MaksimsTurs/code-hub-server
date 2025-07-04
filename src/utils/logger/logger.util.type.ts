export type TLogger = {
  info: (text: string, ...data: any) => void
  error: (error: Error | string, ...data: any) => void
};

export enum ELogLevel {
  ERROR = 'ERROR',
  INFO = 'INFO'
};