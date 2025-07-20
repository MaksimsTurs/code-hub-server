export type TSafeAsyncReturnData<R> = [R | null, Error | TSafeAsyncSerializedError | null];

export type TSafeAsyncCallCallback<R = any> = (...args: any[]) => Promise<R>;

export type TSafeAsyncReturn<R = any> = Promise<TSafeAsyncReturnData<R>>;

export type TSafeAsyncSerializedError = {
	code?: number
	message?: number
	name?: string
	stack?: string
};

export type TSafeAsyncOptions = {
	serializeError: (error: unknown) => TSafeAsyncSerializedError
};