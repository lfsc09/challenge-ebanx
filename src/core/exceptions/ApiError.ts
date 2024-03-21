/**
 * Generic new Error type for this API.
 *
 * @var {number} code    - [Code number that will be used as HTTP status Code]
 * @var {unknown} message - [Error message]
 */
export class ApiError extends Error {
	code: number;

	constructor(code: number = 500, message: unknown) {
		if (typeof message === 'string') super(message);
		else if (message instanceof Error) super(message.message);
		else super('Unknown error..');
		this.code = code;
	}
}
