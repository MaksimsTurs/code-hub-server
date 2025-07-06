import type { TValidationErrorMessage, TValidationErrorsObject } from "./create-validation-errors-object.util.type.js";

export default function createValidationErrorsObject(messages: TValidationErrorMessage[]): TValidationErrorsObject {
	const errors: TValidationErrorsObject = {};
	const length: number = messages.length;

	let index = 0;

	while(index < length) {
		errors[messages[index].field] = messages[index].message;

		index++;
	}

	return errors;
};