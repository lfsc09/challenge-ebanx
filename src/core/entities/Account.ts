export class Account {
	constructor(private account_id: string, private balance: number) {
        if (!account_id.match(/[\d]+/)) throw new Error("invalid account_id");
        if (!balance.toString().match(/[\d]+/) || balance < 0) throw new Error("invalid amount");
    }

    deposit(amount: number) {
        if (!amount.toString().match(/[\d]+/) || amount <= 0) throw new Error('invalid amount');
        this.balance += amount;
    }
    
    withdraw(amount: number) {
        if (!amount.toString().match(/[\d]+/) || amount <= 0) throw new Error('invalid amount');
        this.balance -= amount;
    }

    getBalance(): number {
        return this.balance;
    }
}
