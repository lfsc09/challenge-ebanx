import {
	ApiRepository,
	Input_DepositToAccount,
	Input_GetAccountBalance,
	Input_TransferBetweenAccount,
	Input_WithdrawFromAccount,
	Output_DepositToAccount,
	Output_GetAccountBalance,
	Output_TransferBetweenAccount,
	Output_WithdrawFromAccount,
} from '../../../application/repositories/ApiRepository';
import { Account } from '../../../core/entities/Account';
import { ApiError } from '../../../core/exceptions/ApiError';

export class ApiRepositoryMemory extends ApiRepository {
	constructor(readonly accountManager: Map<string, Account>) {
		super();
	}

	async reset(): Promise<void> {
		this.accountManager.clear();
	}

	async getAccountBalance(input: Input_GetAccountBalance): Promise<Output_GetAccountBalance> {
		let account: Account | undefined = this.accountManager.get(input.account_id);
		if (!account) throw new ApiError(404, 0);
		return account.getBalance();
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

	async withdrawFromAccount(input: Input_WithdrawFromAccount): Promise<Output_WithdrawFromAccount> {
		let account: Account | undefined = this.accountManager.get(input.origin);
		if (!account) throw new ApiError(404, 0);
		account.withdraw(input.amount);
		return { origin: { id: account.getAccountId(), balance: account.getBalance() } };
	}

	async transferBetweenAccount(input: Input_TransferBetweenAccount): Promise<Output_TransferBetweenAccount> {
		let originAccount: Account | undefined = this.accountManager.get(input.origin);
		let destinationAccount: Account | undefined = this.accountManager.get(input.destination);
		if (!originAccount) throw new ApiError(404, 0);
        if (!destinationAccount) {
            destinationAccount = new Account(input.destination, 0);
			this.accountManager.set(destinationAccount.getAccountId(), destinationAccount);
        }
		originAccount.withdraw(input.amount);
		destinationAccount.deposit(input.amount);
		return {
			origin: { id: originAccount.getAccountId(), balance: originAccount.getBalance() },
			destination: { id: destinationAccount.getAccountId(), balance: destinationAccount.getBalance() },
		};
	}
}
