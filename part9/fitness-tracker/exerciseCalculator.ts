export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export interface ExerciseValues {
  target: number,
  dailyExerciseHours: number[]
}

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
  const exerciseArgs: string[] = args.slice(2);
  if (exerciseArgs.length < 2) throw new Error('Not enough arguments');
  const target = Number(exerciseArgs[0]);
  const dailyExerciseHours = exerciseArgs.slice(1).map(e => Number(e));
  if (isNaN(target) || dailyExerciseHours.some(e => isNaN(e))) {
    throw new Error('Provided values were not numbers!');
  }
  return {
    target,
    dailyExerciseHours
  };
};

export const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.reduce((acc, cur) => cur > 0 ? acc + 1 : acc, 0);
  const average = dailyExerciseHours.reduce((acc, cur) => acc + cur, 0) / periodLength;
  const success = average >= target;
  let rating = 1;
  let ratingDescription = 'bad';
  if (average >= target) {
    rating = 3;
    ratingDescription = 'good';
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error, something bad happened, message: ', error.message);
  }
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
