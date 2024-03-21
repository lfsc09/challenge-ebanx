import { ApiRepository, Input_GetAccountBalance, Output_GetAccountBalance } from '../repositories/ApiRepository';

export class BalanceUsercase {
	constructor(readonly apiRepository: ApiRepository) {}

	async execute(input: Input): Promise<Output> {
		if (input.account_id === undefined) throw new Error('invalid account');
		const accountBalance = await this.apiRepository.getAccountBalance(input);
		return accountBalance;
	}
}

type Input = Input_GetAccountBalance;

type Output = Output_GetAccountBalance;
