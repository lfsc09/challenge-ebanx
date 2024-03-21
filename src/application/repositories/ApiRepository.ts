import { Account } from '../../core/entities/Account';

export abstract class ApiRepository {
	abstract depositToAccount(input: Input_DepositToAccount): Promise<Output_DepositToAccount>;
}

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
