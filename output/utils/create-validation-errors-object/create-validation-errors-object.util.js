export default function createValidationErrorsObject(messages) {
    const errors = {};
    const length = messages.length;
    let index = 0;
    while (index < length) {
        errors[messages[index].field] = messages[index].message;
        index++;
    }
    return errors;
}
;
