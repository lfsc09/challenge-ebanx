import { ApiRepository, Input_TransferBetweenAccount, Output_TransferBetweenAccount } from '../repositories/ApiRepository';

export class TransferUsercase {
	constructor(readonly apiRepository: ApiRepository) {}

	async execute(input: Input): Promise<Output> {
		if (input.origin === undefined) throw new Error('invalid origin');
		const accountBalance = await this.apiRepository.transferBetweenAccount(input);
		return accountBalance;
	}
}

type Input = Input_TransferBetweenAccount;

type Output = Output_TransferBetweenAccount;
