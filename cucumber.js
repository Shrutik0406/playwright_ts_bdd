module.exports = {
  default: {
    //retry:2,
    require: [
      'steps/support/world.ts',
      'steps/support/hooks.ts',
      'steps/*.ts'
    ],
    requireModule: ['ts-node/register'], // or 'ts-node/register/transpile-only'
    format: ['html:reports/cucumber-report.html'],
    publishQuiet: true
  }
};