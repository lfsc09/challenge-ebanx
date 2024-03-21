import axios from 'axios';

describe('Transfer Usecases', () => {
	beforeEach(async () => {
        await axios.post('http://127.0.0.1:5000/reset');
		await axios.post('http://127.0.0.1:5000/event', {
			type: 'deposit',
			destination: '100',
			amount: 10,
		});
        await axios.post('http://127.0.0.1:5000/event', {
			type: 'deposit',
			destination: '200',
			amount: 50,
		});
	});

	test('Invalid amount', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'transfer',
				origin: '200',
				destination: '100',
				amount: -10,
			});
		} catch (err: any) {
			expect(err.response.status).toBe(500);
			expect(err.response.data).toBe('invalid amount');
		}
	});

	test('Transfer from existent accounts', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'transfer',
				origin: '200',
				destination: '100',
				amount: 15,
			});
			expect(response.status).toBe(201);
			expect(response.data).toEqual({ origin: { id: '200', balance: 35 }, destination: { id: '100', balance: 25 } });
		} catch (err: any) {}
	});

    test('Transfer from existent accounts - not enough balance', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'transfer',
				origin: '200',
				destination: '100',
				amount: 40,
			});
		} catch (err: any) {
            expect(err.response.status).toBe(500);
			expect(err.response.data).toBe('not enough balance');
        }
	});

    test('Transfer from non-existent account', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'transfer',
				origin: '500',
				destination: '200',
				amount: 10,
			});
		} catch (err: any) {
            expect(err.response.status).toBe(404);
			expect(err.response.data).toBe(0);
        }
	});

	test('Transfer to non-existent account', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: 'transfer',
				origin: '100',
				destination: '500',
				amount: 15,
			});
		} catch (err: any) {
			expect(err.response.status).toBe(404);
			expect(err.response.data).toBe(0);
		}
	});
});
