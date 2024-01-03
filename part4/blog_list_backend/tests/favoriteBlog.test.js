const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favoriteBlog', () => {
	test('returns the blog with the greatest amount of likes', () => {
		const blogs = [
			{
				_id: '1',
				title: 'Blog 1',
				author: 'Author 1',
				url: 'https://example.com/blog1',
				likes: 10,
				__v: 0,
			},
			{
				_id: '2',
				title: 'Blog 2',
				author: 'Author 2',
				url: 'https://example.com/blog2',
				likes: 5,
				__v: 0,
			},
			{
				_id: '3',
				title: 'Blog 3',
				author: 'Author 3',
				url: 'https://example.com/blog3',
				likes: 15,
				__v: 0,
			},
		]

		const result = favoriteBlog(blogs)

		expect(result).toEqual({
			title: 'Blog 3',
			author: 'Author 3',
			likes: 15,
		})
	})

	test('returns the first blog when all blogs have the same number of likes', () => {
		const blogs = [
			{
				_id: '1',
				title: 'Blog 1',
				author: 'Author 1',
				url: 'https://example.com/blog1',
				likes: 10,
				__v: 0,
			},
			{
				_id: '2',
				title: 'Blog 2',
				author: 'Author 2',
				url: 'https://example.com/blog2',
				likes: 10,
				__v: 0,
			},
			{
				_id: '3',
				title: 'Blog 3',
				author: 'Author 3',
				url: 'https://example.com/blog3',
				likes: 10,
				__v: 0,
			},
		]

		const result = favoriteBlog(blogs)

		expect(result).toEqual({
			title: 'Blog 1',
			author: 'Author 1',
			likes: 10,
		})
	})

	test('returns null when the list of blogs is empty', () => {
		const blogs = []

		const result = favoriteBlog(blogs)

		expect(result).toBeNull()
	})
})
