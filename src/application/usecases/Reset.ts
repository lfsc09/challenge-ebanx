import { ApiRepository, Input_DepositToAccount, Output_DepositToAccount } from '../repositories/ApiRepository';

export class ResetUsercase {
    constructor(readonly apiRepository: ApiRepository) {}

    async execute(): Promise<void> {
        await this.apiRepository.reset();
    }
}
