describe('Upload Document Module', () => {
  beforeEach(() => {
    cy.visit('/upload-document');
    cy.viewport(1280, 720);
    cy.intercept('**/*').as('pageLoad');
    cy.wait('@pageLoad', { timeout: 10000 });
  });

  it('should render the upload document module', () => {
    cy.get('[data-testid="upload-document-module"]').should('exist');
    cy.contains('UPLOAD HERE!').should('be.visible');
    cy.get('[data-testid="file-input"]').should('exist');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should allow file upload and enable submit button', () => {
    // Upload a document
    cy.fixture('sample-image.png', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get('[data-testid="file-input"]').within(() => {
          cy.get('input[type="file"]').selectFile(
            {
              contents: fileContent,
              fileName: 'sample-image.png',
              mimeType: 'image/jpeg',
            },
            { force: true }
          );
        });
      });

    // Verify file is uploaded by checking preview component is visible
    cy.get('[data-testid="file-input-preview"]').should('be.visible');
    cy.get('[data-testid="file-input-filename"]').should(
      'contain',
      'sample-image.png'
    );

    // Check that the submit button is now enabled
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should submit the form successfully', () => {
    // Upload a file
    cy.fixture('sample-image.png', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get('[data-testid="file-input"]').within(() => {
          cy.get('input[type="file"]').selectFile(
            {
              contents: fileContent,
              fileName: 'sample-image.png',
              mimeType: 'image/jpeg',
            },
            { force: true }
          );
        });
      });

    // Submit the form
    cy.get('[data-testid="upload-button"]').click();

    // Check for uploading state
    cy.get('[data-testid="upload-button"]').should('contain', 'Uploading...');

    // Check for success state (this relies on the toast notification)
    // Wait up to 10 seconds for success message to appear
    cy.contains('Document uploaded successfully', { timeout: 10000 })
      .should('be.visible')
      .then(($el) => {
        // If we reach this point, the element was found
        cy.log('Success message appeared as expected');
      });
  });

  it('should allow removing selected file', () => {
    // Upload a file first
    cy.fixture('sample-image.png', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get('[data-testid="file-input"]').within(() => {
          cy.get('input[type="file"]').selectFile(
            {
              contents: fileContent,
              fileName: 'sample-image.png',
              mimeType: 'image/jpeg',
            },
            { force: true }
          );
        });
      });

    // Verify file is uploaded
    cy.get('[data-testid="file-input-preview"]').should('be.visible');
    cy.get('[data-testid="file-input-filename"]').should(
      'contain',
      'sample-image.png'
    );

    // Clear the file
    cy.get('[data-testid="file-input-clear"]').click();

    // Verify file is cleared - dropzone should reappear and submit button should be disabled
    cy.get('[data-testid="file-input-dropzone"]').should('be.visible');
    cy.get('[data-testid="file-input-preview"]').should('not.exist');
    cy.get('button[type="submit"]').should('be.disabled');
  });
});
