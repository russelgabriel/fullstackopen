describe('Note app', function() {
	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		const user = {
			name: 'Test User',
			username: 'testuser',
			password: 'testpassword'
		}
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
		cy.visit('')
	})
  it('front page can be opened', function() {
		cy.contains('Notes')
  })

	it('login form can be opened', function() {
		cy.contains('log in').click()
		cy.get('input[name="Username"]').type('testuser')
		cy.get('input[name="Password"]').type('testpassword')
		cy.get('button[type="submit"]').click()
		cy.contains('logged-in')
	})

	it('login fails with incorrect credentials', function() {
		cy.contains('log in').click()
		cy.get('input[name="Username"]').type('testuser')
		cy.get('input[name="Password"]').type('wrong')
		cy.get('button[type="submit"]').click()
		cy.get('.notification').should('contain', 'Wrong credentials')
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'testuser', password: 'testpassword' })
		})

		it('a new note can be created', function() {
			cy.contains('new note').click()
			cy.contains('Create a new note')
			cy.get('#note-input').type('a note created by cypress')
			cy.contains('save').click()
			cy.contains('a note created by cypress')
		})

		describe('and several notes exists', function() {
			beforeEach(function() {
				cy.createNote({ content: 'first note', important: false })
				cy.createNote({ content: 'second note', important: false })
				cy.createNote({ content: 'third note', important: false })
			})

			it('one of those can be made important', function() {
				cy.contains('second note').parent().find('button').as('theButton')
				cy.get('@theButton').click()
				cy.get('@theButton').should('contain', 'make not important')
			})
		})
	})
})