const average = require('../utils/for_testing').average

describe('average', () => {
	test('returns the average of an array of numbers', () => {
		const numbers = [1, 2, 3, 4, 5]
		const expectedAverage = 3

		const result = average(numbers)

		expect(result).toBe(expectedAverage)
	})

	test('returns 0 if the array is empty', () => {
		const numbers = []
		const expectedAverage = 0

		const result = average(numbers)

		expect(result).toBe(expectedAverage)
	})

	test('returns NaN if the array contains non-numeric values', () => {
		const numbers = [1, 2, 'three', 4, 5]
		const expectedAverage = NaN

		const result = average(numbers)

		expect(result).toBe(expectedAverage)
	})

	test('returns the average of an array of negative numbers', () => {
		const numbers = [-1, -2, -3, -4, -5]
		const expectedAverage = -3

		const result = average(numbers)

		expect(result).toBe(expectedAverage)
	})

	test('returns the average of an array of floating point numbers', () => {
		const numbers = [1.5, 2.5, 3.5, 4.5, 5.5]
		const expectedAverage = 3.5

		const result = average(numbers)

		expect(result).toBe(expectedAverage)
	})

	test('returns the average of a large array of numbers', () => {
		const numbers = Array.from({ length: 100000 }, (_, i) => i + 1)
		const expectedAverage = 50000.5

		const result = average(numbers)

		expect(result).toBe(expectedAverage)
	})

	test('returns the average of an array containing only one number', () => {
		const numbers = [5]
		const expectedAverage = 5

		const result = average(numbers)

		expect(result).toBe(expectedAverage)
	})
})
