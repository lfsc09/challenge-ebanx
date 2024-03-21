import { ApiRepository, Input_DepositToAccount, Output_DepositToAccount } from '../../../application/repositories/ApiRepository';
import { Account } from '../../../core/entities/Account';

export class ApiRepositoryMemory extends ApiRepository {
	constructor(readonly accountManager: Map<string, Account>) {
		super();
	}

	async depositToAccount(input: Input_DepositToAccount): Promise<Output_DepositToAccount> {
		let account: Account | undefined = this.accountManager.get(input.destination);
		if (!account) {
			account = new Account(input.destination, input.amount);
			this.accountManager.set(account.getAccountId(), account);
		} else {
			account.deposit(input.amount);
		}
		return { destination: { id: account.getAccountId(), balance: account.getBalance() } };
	}
}
