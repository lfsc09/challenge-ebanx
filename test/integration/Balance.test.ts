import axios from 'axios';

describe('Balance Usecases', () => {
	beforeEach(async () => {
		await axios.post('http://127.0.0.1:5000/reset');
		await axios.post('http://127.0.0.1:5000/event', {
			type: 'deposit',
			destination: '100',
			amount: 50,
		});
	});

	test('Check Balance existent account', async () => {
		try {
			await axios.post('http://127.0.0.1:5000/event', {
				type: 'withdraw',
				destination: '100',
				amount: 20,
			});
			let response = await axios.get('http://127.0.0.1:5000/balance?account_id=100');
			expect(response.status).toBe(200);
			expect(response.data).toEqual(30);
		} catch (err: any) {}
	});

	test('Check Balance non existent account', async () => {
		try {
			let response = await axios.get('http://127.0.0.1:5000/balance?account_id=500');
		} catch (err: any) {
			expect(err.response.status).toBe(404);
			expect(err.response.data).toBe(0);
		}
	});
});
