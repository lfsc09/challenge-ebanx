import { Account } from '../../core/entities/Account';

export abstract class ApiRepository {
    abstract reset(): Promise<void>

    abstract getAccountBalance(input: Input_GetAccountBalance): Promise<Output_GetAccountBalance>;

	abstract depositToAccount(input: Input_DepositToAccount): Promise<Output_DepositToAccount>;

	abstract withdrawFromAccount(input: Input_WithdrawFromAccount): Promise<Output_WithdrawFromAccount>;

    abstract transferBetweenAccount(input: Input_TransferBetweenAccount): Promise<Output_TransferBetweenAccount>;
}

export type Input_GetAccountBalance = {
	account_id: string;
};
export type Output_GetAccountBalance = number;

export type Input_DepositToAccount = {
	destination: string;
	amount: number;
};
export type Output_DepositToAccount = {
	destination: {
		id: string;
		balance: number;
	};
};

export type Input_WithdrawFromAccount = {
	origin: string;
	amount: number;
};
export type Output_WithdrawFromAccount = {
	origin: {
		id: string;
		balance: number;
	};
};

export type Input_TransferBetweenAccount = {
	origin: string;
    destination: string;
	amount: number;
};
export type Output_TransferBetweenAccount = {
	origin: {
		id: string;
		balance: number;
	};
    destination: {
		id: string;
		balance: number;
	};
};