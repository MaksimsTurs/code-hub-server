import type { Request, Response, NextFunction } from "express";

import vine, { SimpleMessagesProvider } from "@vinejs/vine";

import safeAsyncCall from "../utils/safe-async-call/safe-async-call.util.js";

const newProjectDataValidator = vine.compile(
	vine.object({
		name: vine.string().minLength(3).maxLength(20),
		description: vine.string().maxLength(250).optional(),
		visibility: vine.string(),
	})
);

export default async function validateNewProjectData(request: Request, _response: Response, next: NextFunction): Promise<void> {
	const [_, errorByValidating] = await safeAsyncCall<void>(async function() {
		await newProjectDataValidator.validate(
			request.body, 
			{ 
				messagesProvider: new SimpleMessagesProvider(
					{
						minLength: "{{ field }} is to short!",
						maxLength: "{{ field }} is to long!",
						required:  "{{ field }} is required!"
					},
					{
						name: "Name",
						description: "Description",
						visibility: "Visibility"
					}
				) 
			}
		);
	});

	if(errorByValidating) {
		return next(errorByValidating);
	}
	
	return next();
};