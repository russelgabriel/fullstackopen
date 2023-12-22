const dummy = require('../utils/list_helper').dummy

test('dummy function returns 1', () => {
	const result = dummy([])
	expect(result).toBe(1)
})
