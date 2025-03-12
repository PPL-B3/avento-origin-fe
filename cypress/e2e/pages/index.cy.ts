describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1280, 720);
    cy.intercept('**/*').as('pageLoad');
    cy.wait('@pageLoad', { timeout: 10000 });
  });

  it('should load the home page', () => {
    // Check that the page title appears
    cy.contains('Avento Origin').should('be.visible');
  });

  it('should navigate to upload document page', () => {
    // Find and click on the upload document link
    cy.contains('Upload Document').click();

    // Verify we navigated to the upload page
    cy.url().should('include', '/upload-document');

    // Check that the upload form is visible
    cy.get('[data-testid="file-input"]').should('be.visible');
  });
});
