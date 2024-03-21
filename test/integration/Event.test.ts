import axios from 'axios';

describe('Event endpoint', () => {
	test('Invalid type', async () => {
		try {
			let response = await axios.post('http://127.0.0.1:5000/event', {
				type: '######',
				destination: '100',
				amount: 10,
			});
		} catch (err: any) {
			expect(err.response.status).toBe(500);
			expect(err.response.data).toBe('invalid type');
		}
	});
});
