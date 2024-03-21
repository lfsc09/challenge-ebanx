import axios from 'axios';

describe('Deposit Usecases', () => {
	test('Invalid amount', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'deposit',
				destination: '100',
				amount: -10,
			});
		} catch (err: any) {
			expect(err.response.status).toBe(500);
			expect(err.response.data).toBe('invalid amount');
		}
	});

	test('Deposit in new account', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'deposit',
				destination: '100',
				amount: 10,
			});
			expect(response.status).toBe(200);
			expect(response.data).toEqual({ destination: { id: '100', balance: 10 } });
		} catch (err: any) {}
	});

	test('Deposit in existant account', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'deposit',
				destination: '100',
				amount: 50,
			});
			expect(response.status).toBe(200);
			expect(response.data).toEqual({ destination: { id: '100', balance: 60 } });
		} catch (err: any) {}
	});
});
