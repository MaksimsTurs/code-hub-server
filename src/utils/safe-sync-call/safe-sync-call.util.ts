import type { TSafeSyncCallCallback, TSafeSyncReturn } from "./safe-sync-call.util.type.js";

export default function safeSyncCall<R>(callback: TSafeSyncCallCallback<R>, ...args: any[]): TSafeSyncReturn<R> {
	try {
		return [callback(...args), null];
	} catch(error) {
		return [null, error as Error];
	}
};