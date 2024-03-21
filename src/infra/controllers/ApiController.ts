import { NextFunction, Response } from 'express';
import { DepositUsercase } from '../../application/usecases/Deposit';
import { ApiError } from '../../core/exceptions/ApiError';
import { CustomRequest } from '../../main';

export class ApiController {
	/**
	 * Proccess an event
	 *
	 * @var {string} type - [The type of event] (deposit | withdraw | transfer)
	 *
	 * if @var type is `deposit`
	 * @var {string} destination - [The account_id]
	 * @var {number} amount      - [The amount to be deposited]
	 *
	 * if @var type is `withdraw`
	 * @var {string} origin - [The account_id]
	 * @var {number} amount - [The amount to be withdrawned]
	 *
	 * if @var type is `transfer`
	 * @var {string} origin      - [Origin account_id]
	 * @var {string} destination - [Destination account_id]
	 * @var {number} amount      - [The amount to be transfered]
	 */
	static async event(request: CustomRequest, response: Response, next: NextFunction) {
		const type: undefined | string = request.body?.type ?? undefined;
		try {
			switch (type) {
				case 'deposit':
					const input = {
						destination: request.body?.destination ?? undefined,
						amount: request.body?.amount ?? undefined,
					};
					let output = await new DepositUsercase(request.apiRepositoryMemory).execute(input);
					response.status(200).json(output);
					break;
				case 'withdraw':
					break;
				case 'transfer':
					break;
				default:
					throw new ApiError(500, 'invalid type');
			}
		} catch (err: any) {
			return next(err instanceof ApiError ? err : new ApiError(500, err));
		}
	}
}
