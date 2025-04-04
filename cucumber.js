module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['tests/playwright/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true
  }
};