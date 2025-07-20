import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import safeAsyncCall from "../utils/safe-async-call/safe-async-call.util.js";
const signInValidator = vine.compile(vine.object({
    name: vine.string().maxLength(20).regex(/[A-Za-z0-9_-]/),
}));
export default async function validateNewAccountData(request, _response, next) {
    const [_, errorByValidating] = await safeAsyncCall(async function () {
        await signInValidator.validate(request.body, {
            messagesProvider: new SimpleMessagesProvider({
                maxLength: "{{ field }} is to long!",
                required: "{{ field }} is required!",
                regexp: "{{ field }} is incorrect!"
            }, {
                name: "Name",
            })
        });
    });
    if (errorByValidating) {
        return next(errorByValidating);
    }
    return next();
}
;
