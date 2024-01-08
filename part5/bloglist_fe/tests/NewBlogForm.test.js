import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from '../src/components/NewBlogForm'

describe('<NewBlogForm />', () => {
	let component
	let handleCreateBlog

	beforeEach(() => {
		handleCreateBlog = jest.fn()

		component = render(
			<NewBlogForm handleCreateBlog={handleCreateBlog} />
		)
	})

	test('create blog form is submitted', async () => {
		const { container } = component
		const user = userEvent.setup()
		const titleInput = screen.getByLabelText('Title')
		const authorInput = screen.getByLabelText('Author')
		const urlInput = screen.getByLabelText('URL')
		const submitButton = screen.getByText('Add')

		await userEvent.type(titleInput, 'Test title')
		await userEvent.type(authorInput, 'Test author')
		await userEvent.type(urlInput, 'http://testurl.com')

		const form = container.querySelector('form')
		await userEvent.click(submitButton)

		expect(handleCreateBlog.mock.calls).toHaveLength(1)
		expect(handleCreateBlog.mock.calls[0][0].title).toBe('Test title')
		expect(handleCreateBlog.mock.calls[0][0].author).toBe('Test author')
		expect(handleCreateBlog.mock.calls[0][0].url).toBe('http://testurl.com')
	})
})