/* global browser */

// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');


console.log('starting mock server');
const { spawn } = require('child_process');
const mockServer = spawn('node', ['./e2e/mock-server.js']);
process.on('exit', () => {
  console.log('stopping mock server');
  mockServer.kill();
});
mockServer.stdout.pipe(process.stdout);


exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  ngApimockOpts: {
    angularVersion: 2,
    hybrid: false
  },
  onPrepare () {
    // this is generated during beforeLaunch()
    browser.ngApimock = require('./.tmp/ngApimock/protractor.mock.js');
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
