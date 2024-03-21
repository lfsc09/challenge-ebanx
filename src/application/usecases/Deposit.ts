import { ApiRepository, Input_DepositToAccount, Output_DepositToAccount } from '../repositories/ApiRepository';

export class DepositUsercase {
    constructor(readonly apiRepository: ApiRepository) {}

    async execute(input: Input): Promise<Output> {
        const accountBalance = await this.apiRepository.depositToAccount(input);
        return accountBalance;
    }
}

type Input = Input_DepositToAccount;

type Output = Output_DepositToAccount;
