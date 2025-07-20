import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import safeAsyncCall from "../utils/safe-async-call/safe-async-call.util.js";
const signInValidator = vine.compile(vine.object({
    name: vine.string().maxLength(20).regex(/[A-Za-z0-9_-]/),
    email: vine.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
    password: vine.string().minLength(12),
}));
export default async function validateSignInData(request, _response, next) {
    const [_, errorByValidating] = await safeAsyncCall(async function () {
        await signInValidator.validate(request.body, {
            messagesProvider: new SimpleMessagesProvider({
                minLength: "{{ field }} is to short!",
                maxLength: "{{ field }} is to long!",
                required: "{{ field }} is required!",
                regexp: "{{ field }} is incorrect!"
            }, {
                name: "Name",
                email: "E - Mail",
                password: "Password"
            })
        });
    });
    if (errorByValidating) {
        return next(errorByValidating);
    }
    return next();
}
;
