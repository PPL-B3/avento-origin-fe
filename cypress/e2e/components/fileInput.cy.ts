describe('FileInput Component', () => {
  beforeEach(() => {
    cy.visit('/upload-document');
    cy.viewport(1280, 720);
    cy.intercept('**/*').as('pageLoad');
    cy.wait('@pageLoad', { timeout: 10000 });
  });

  it('should render with default state', () => {
    cy.get('[data-testid="file-input"]').should('exist');
    cy.get('[data-testid="file-input-dropzone"]').should('exist');
    cy.contains('Drag and drop your file here').should('be.visible');
  });

  it('should allow file selection', () => {
    // Create a test file and upload
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

    // Check if file name is displayed
    cy.get('[data-testid="file-input-preview"]').should('be.visible');
    cy.get('[data-testid="file-input-filename"]').should(
      'contain',
      'sample-image.png'
    );

    // Check if clear button exists
    cy.get('[data-testid="file-input-clear"]').should('exist');
  });

  it('should allow clearing selected file', () => {
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

    // Verify file is uploaded by checking preview component
    cy.get('[data-testid="file-input-preview"]').should('be.visible');
    cy.get('[data-testid="file-input-filename"]').should(
      'contain',
      'sample-image.png'
    );

    // Clear the file
    cy.get('[data-testid="file-input-clear"]').click();

    // Verify file is cleared - wait for the dropzone to reappear
    cy.get('[data-testid="file-input-dropzone"]').should('be.visible');
    cy.get('[data-testid="file-input-preview"]').should('not.exist');
  });

  it('should show correct file type restrictions', () => {
    cy.get('[data-testid="file-input"]').should('exist');
    cy.contains('The file must be in format').should('be.visible');
    cy.contains('*png, *jpeg, *jpg').should('be.visible');
  });
});
