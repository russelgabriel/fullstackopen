import React from 'react';
import "@testing-library/jest-dom"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Note from './Note';

test('renders content', () => {
	const note = {
		content: 'Component testing is done with the react-testing-library',
		important: true
	}

	// Method 1
	render(<Note note={note} />)
	expect(screen.getByText(note.content)).toBeDefined()

	// screen.debug()
	

	// // Method 2
	// const { container } = render(<Note note={note} />)

	// const div = container.querySelector('.note')
	// expect(div).toHaveTextContent(note.content)
})

test('clicking the button calls the event handler once', async () => {
	const note = {
		content: "Component testing is done with react-testing-library",
		important: true
	}

	const mockHandler = jest.fn()

	render(<Note note={note} toggleImportance={mockHandler} />)

	const user = userEvent.setup()
	const button = screen.getByText('make not important') // check test note important is true
	await user.click(button)

	expect(mockHandler.mock.calls).toHaveLength(1)
})