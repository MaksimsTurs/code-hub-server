import type { TSafeAsyncCallCallback, TSafeAsyncReturn, TSafeAsyncOptions, TSafeAsyncSerializedError } from "./safe-async-call.util.type";

export default async function safeAsyncCall<R>(callback: TSafeAsyncCallCallback<R>, options?: TSafeAsyncOptions, ...args: any[]): TSafeAsyncReturn<R> {
	try {
		return [await callback(...args), null];
	} catch(error) {
		const maybeSerialized = (options?.serializeError ? options.serializeError(error) : error) as Error | TSafeAsyncSerializedError;
		return [null, maybeSerialized];
	}
}