import { Account } from '../../src/core/entities/Account';

describe('Account', () => {
	test('Create Account normal values', () => {
		try {
			const newAccount = new Account('100', 10);
            expect(newAccount.getBalance()).toBe(10);
		} catch (err: any) {}
	});

    test('Create Account wrong id', () => {
		try {
			const newAccount = new Account("das sdasf", 10);
		} catch (err: any) {
            expect(err.message).toBe('invalid account_id');
        }
	});

    test('Create Account negative amount', () => {
		try {
			const newAccount = new Account("100", -10);
		} catch (err: any) {
            expect(err.message).toBe('invalid amount');
        }
	});

    test('Create Account string amount', () => {
		try {
			const newAccount = new Account("100", <number><unknown>'12asdasf');
		} catch (err: any) {
            expect(err.message).toBe('invalid amount');
        }
	});
});
