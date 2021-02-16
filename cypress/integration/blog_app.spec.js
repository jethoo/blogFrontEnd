import { func } from "prop-types"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
        name: 'Blog Tester',
        username: 'Part 5',
        password: 'Cypress'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
      it('succeeds with correct credentials', function(){
        cy.get('#username').type('Part 5')
        cy.get('#password').type('Cypress')
        cy.get('#login-button').click()
      })

      it('fails with wrong credentials', function(){
        //first have to log-out
        cy.get('#log-out').click()
        cy.get('#username').type('Jiban')
        cy.get('#password').type('Jiban')
        cy.get('#login-button').click()

        cy.get('.error')
           .should('contain', 'Wrong Username or password')
           .and('have.css', 'color', 'rgb(255, 0, 0)')
           .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'Blog Tester logged in')
      })

      describe('When logged in', function(){
          beforeEach(function(){
              //log in user here
              cy.login({ username: 'Part 5', password: 'Cypress' })
          })

          it(' logged-in user can create blog', function() {
              cy.contains('create new blog').click()
              cy.get('#title').type('E2E testing using Cypress')
              cy.get('#author').type('Jeewan')
              cy.get('#url').type('www.e2e.com')
              cy.get('#create').click()

              cy.contains('E2E testing using Cypress')
              //cy.contains('E2E testing using Cypress')
              cy.contains('view').click()
              cy.contains(0)
              cy.contains('like').click()
              cy.contains(1)
          })
      })

      describe('User logged-in, creates and deletes', function(){
        beforeEach(function(){
            //log in user here
            cy.login({ username: 'Part 5', password: 'Cypress' })
            cy.createBlog({ title: 'Second test', author: 'JB', url: 'www.jb.com', likes: 5 })
        })

        it(' created blog can be deleted', function(){
           cy.contains('view').click()
           cy.contains('remove').click()

           cy.visit('http://localhost:3000')
           cy.login({ username: 'Part 5', password: 'Cypress' })

           cy.get('html').should('not.contain', 'Second test')
        })
      })

      describe.only('Blogs sorted by Max likes', function(){
        beforeEach(function(){
            //log in user here
            cy.login({ username: 'Part 5', password: 'Cypress' })
            cy.createBlog({ title: 'First blog', author: 'JB', url: 'www.jb.com', likes: 2 })
            cy.createBlog({ title: 'Second blog', author: 'Bhusal', url: 'www.bhusal.com', likes: 0 })
            cy.createBlog({ title: 'Third blog', author: 'Jiban', url: 'www.jiban.com', likes: 10 })
        })

        it('User is logged in and blogs created', function(){
            cy.contains('view').click()
            cy.contains('like')
            cy.contains(10)
        })
      })
  })
})