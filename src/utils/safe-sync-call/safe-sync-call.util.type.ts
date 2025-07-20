export type TSafeSyncCallCallback<R = any> = (...args: any[]) => R;

export type TSafeSyncReturn<R = any> = [R | null, Error | null];
