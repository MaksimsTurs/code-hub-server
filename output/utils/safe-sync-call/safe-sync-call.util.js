export default function safeSyncCall(callback, ...args) {
    try {
        return [callback(...args), null];
    }
    catch (error) {
        return [null, error];
    }
}
;
