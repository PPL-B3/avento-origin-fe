import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Default Next.js development server URL
    setupNodeEvents(on, config) {
      // You can add custom tasks or plugins here if needed
    },
  },
});
