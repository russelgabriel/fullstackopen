const reverse = require('../utils/for_testing').reverse

describe('reverse function', () => {
	test('should reverse a string', () => {
		const input = 'Hello, World!'
		const expected = '!dlroW ,olleH'
		const result = reverse(input)
		expect(result).toEqual(expected)
	})

	test('should return an empty string when input is empty', () => {
		const input = ''
		const expected = ''
		const result = reverse(input)
		expect(result).toEqual(expected)
	})

	test('should return the same string when input has only one character', () => {
		const input = 'a'
		const expected = 'a'
		const result = reverse(input)
		expect(result).toEqual(expected)
	})

	test('should reverse a string with special characters', () => {
		const input = '!@#$%^&*()'
		const expected = ')(*&^%$#@!'
		const result = reverse(input)
		expect(result).toEqual(expected)
	})

	test('should reverse a string with numbers', () => {
		const input = '1234567890'
		const expected = '0987654321'
		const result = reverse(input)
		expect(result).toEqual(expected)
	})

	test('should reverse a string with whitespace', () => {
		const input = 'Hello, World!'
		const expected = '!dlroW ,olleH'
		const result = reverse(input)
		expect(result).toEqual(expected)
	})
})
