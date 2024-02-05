type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

const calculate = (a: number, b: number, operation: Operation): number => {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
    default:
      throw new Error('Operation not supported');
  }
}
console.log(process.argv);

