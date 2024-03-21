import { NextFunction, Response } from 'express';
import { DepositUsercase } from '../../application/usecases/Deposit';
import { WithdrawUsercase } from '../../application/usecases/Withdraw';
import { ApiError } from '../../core/exceptions/ApiError';
import { CustomRequest } from '../../main';
import { TransferUsercase } from '../../application/usecases/Transfer';

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
			let input;
			let output;
			switch (type) {
				case 'deposit':
					input = {
						destination: request.body?.destination ?? undefined,
						amount: request.body?.amount ?? undefined,
					};
					output = await new DepositUsercase(request.apiRepositoryMemory).execute(input);
					break;
				case 'withdraw':
					input = {
						origin: request.body?.origin ?? undefined,
						amount: request.body?.amount ?? undefined,
					};
					output = await new WithdrawUsercase(request.apiRepositoryMemory).execute(input);
					break;
				case 'transfer':
					input = {
						origin: request.body?.origin ?? undefined,
						destination: request.body?.destination ?? undefined,
						amount: request.body?.amount ?? undefined,
					};
					output = await new TransferUsercase(request.apiRepositoryMemory).execute(input);
					break;
				default:
					throw new ApiError(500, 'invalid type');
			}
			response.status(200).json(output);
		} catch (err: any) {
			return next(err instanceof ApiError ? err : new ApiError(500, err));
		}
	}
}
