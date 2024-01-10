describe('Blog app', function () {
	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		let user = {
			name: 'Test User',
			username: 'testuser',
			password: 'testpassword'
		}
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

		user = {
			name: 'Test User 2',
			username: 'testuser2',
			password: 'testpassword2'
		}
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
		cy.visit('')
	})

	it('Login form is shown', function () {
		cy.contains('Log in to Blogs List')
		cy.contains('username')
		cy.contains('password')
		cy.get('input').should('have.length', 2)
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('input[name="username"]').type('testuser')
			cy.get('input[name="password"]').type('testpassword')
			cy.get('button[type="submit"]').click()
			cy.contains('Hello, Test User')
		})

		it('fails with wrong credentials', function() {
			cy.get('input[name="username"]').type('testuser')
			cy.get('input[name="password"]').type('wrongpassword')
			cy.get('button[type="submit"]').click()
			cy.get('#notification')
				.should('contain', 'Incorrect username or password')
				.and('have.css', 'background-color', 'rgb(242, 222, 222)')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'testuser', password: 'testpassword' })
			cy.visit('')
		})

		it('A blog can be created', function() {
			cy.get('button').contains('Add blog').click()
			cy.get('#title').type('Test Blog')
			cy.get('#author').type('Test Author')
			cy.get('#URL').type('http://testurl.com')
			cy.get('button[type="submit"]').click()
			cy
				.get('#notification')
				.contains('a new blog')
				.should('have.css', 'background-color', 'rgb(223, 240, 216)')
		})

		describe('and a blog exsists', function() {
			beforeEach(function() {
				cy.createBlog({
					title: 'Test Blog',
					author: 'Test Author',
					url: 'http://testurl.com'
				})
			})

			it('A blog can be liked', function() {
				cy.get('button').contains('view').click()
				cy.get('button').contains('like').click()
				cy.contains('likes: 1')
			})

			it('A blog can be deleted', function() {
				cy.get('button').contains('view').click()
				cy.get('button').contains('remove').click()
				cy.get('html').should('not.contain', 'Test Blog')
			})
		})

		describe('and several blogs exsist', function() {
			beforeEach(function() {
				cy.createBlog({
					title: 'Test Blog 1',
					author: 'Test Author 1',
					url: 'http://testurl1.com',
				})
				cy.createBlog({
					title: 'Test Blog 2',
					author: 'Test Author 2',
					url: 'http://testurl2.com',
				})
				cy.createBlog({
					title: 'Test Blog 3',
					author: 'Test Author 3',
					url: 'http://testurl3.com',
				})
			})

			it('Blogs are ordered by likes', function() {
				// Test blog 1 should have 1 likes
				// Test blog 2 should have 0 like
				// Test blog 3 should have 3 likes
			
				// Click the 'like' button for 'Test Blog 3' three times
				cy.contains('Test Blog 3').parent().parent().as('blog3')
				cy.get('@blog3').contains('view').click()
				cy.get('@blog3').contains('like').click()
				cy.get('@blog3').contains('likes: 1').should('exist')
				cy.get('@blog3').contains('like').click()
				cy.get('@blog3').contains('likes: 2').should('exist')
				cy.get('@blog3').contains('like').click()
				cy.get('@blog3').contains('likes: 3').should('exist')
			
				// Click the 'like' button for 'Test Blog 1' once
				cy.contains('Test Blog 1').parent().parent().as('blog1')
				cy.get('@blog1').contains('view').click()
				cy.get('@blog1').contains('like').click()
				cy.get('@blog1').contains('likes: 1').should('exist')
				
				cy.get('.blog').eq(0).contains('Test Blog 3')
				cy.get('.blog').eq(1).contains('Test Blog 1')
				cy.get('.blog').eq(2).contains('Test Blog 2')
			})
		})
	})

	describe('When logged in as another user', function() {
		beforeEach(function() {
			cy.login({ username: 'testuser', password: 'testpassword' })
			cy.createBlog({
				title: 'Test Blog',
				author: 'Test Author',
				url: 'http://testurl.com'
			})
			cy.contains('logout').click()
		})
		describe('and a blog from another user exsists', function() {
			beforeEach(function() {
				cy.login({ username: 'testuser2', password: 'testpassword2' })
			})

			it('The blog cannot be deleted', function() {
				cy.get('button').contains('view').click()
				cy.get('button').should('not.contain', 'remove')
			})
		})	
	})
})