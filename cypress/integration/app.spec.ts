describe('App', () => {
  it('should redirect to the login page', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
  })
})
