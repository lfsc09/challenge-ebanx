import axios from 'axios';

describe('Withdraw Usecases', () => {
	beforeEach(async () => {
        await axios.post('http://127.0.0.1:5000/reset');
		await axios.post('http://127.0.0.1:5000/event', {
			type: 'deposit',
			destination: '100',
			amount: 10,
		});
	});

	test('Invalid amount', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'withdraw',
				origin: '100',
				amount: -10,
			});
		} catch (err: any) {
			expect(err.response.status).toBe(500);
			expect(err.response.data).toBe('invalid amount');
		}
	});

	test('Withdraw existent account', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'withdraw',
				origin: '100',
				amount: 10,
			});
			expect(response.status).toBe(200);
			expect(response.data).toEqual({ destination: { id: '100', balance: 10 } });
		} catch (err: any) {}
	});

	test('Withdraw non existing account', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'withdraw',
				origin: '500',
				amount: 15,
			});
		} catch (err: any) {
			expect(err.response.status).toBe(404);
			expect(err.response.data).toBe(0);
		}
	});
});
