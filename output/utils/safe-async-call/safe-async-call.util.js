export default async function safeAsyncCall(callback, options, ...args) {
    try {
        return [await callback(...args), null];
    }
    catch (error) {
        const maybeSerialized = (options?.serializeError ? options.serializeError(error) : error);
        return [null, maybeSerialized];
    }
}
