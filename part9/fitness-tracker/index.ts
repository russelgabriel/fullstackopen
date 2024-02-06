import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) =>{
  const queryParameters = req.query;
  const height = Number(queryParameters.height);
  const weight = Number(queryParameters.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(height, weight);
  res.send(JSON.stringify({ weight, height, bmi }));
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some((e: unknown) => isNaN(Number(e)))) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const exercises_arr = daily_exercises as number[];
  const target_num = Number(target);
  
  const result: Result = calculateExercises(exercises_arr, target_num);
  res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});