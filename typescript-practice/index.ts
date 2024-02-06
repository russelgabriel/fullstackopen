import express from 'express';
import { calculate, Operation } from './calculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
	res.send('pong');
});

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.post('/calculate', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { value1, value2, op } = req.body;

	if (!value1 || !value2 || !op) {
		res.status(400).json({ error: 'malformatted parameters' });
	}

	const operation = op as Operation;

	const result = calculate(Number(value1), Number(value2), operation);
	res.send(JSON.stringify({ result }));
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});