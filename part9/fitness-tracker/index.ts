import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) =>{
  const queryParameters = req.query;
  const height = Number(queryParameters.height);
  const weight = Number(queryParameters.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(height, weight);
  res.send(JSON.stringify({ weight, height, bmi }));
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})