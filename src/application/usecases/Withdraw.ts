import { ApiRepository, Input_WithdrawFromAccount, Output_WithdrawFromAccount } from '../repositories/ApiRepository';

export class WithdrawUsercase {
	constructor(readonly apiRepository: ApiRepository) {}

	async execute(input: Input): Promise<Output> {
		if (input.origin === undefined) throw new Error('invalid origin');
		const accountBalance = await this.apiRepository.withdrawFromAccount(input);
		return accountBalance;
	}
}

type Input = Input_WithdrawFromAccount;

type Output = Output_WithdrawFromAccount;
