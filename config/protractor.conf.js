require('ts-node/register');
const helpers = require('./helpers');

exports.config = {
  baseUrl: 'http://localhost:3000/',
  specs: [
    helpers.root('src/**/**.e2e.ts'),
    helpers.root('src/**/*.e2e.ts')
  ],
  exclude: [],
  framework: 'jasmine2',
  allScriptsTimeout: 110000,
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },
  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  // tell Protractor to wait for any ng2 apps on the page instead of just the one matching rootEl
  useAllAngular2AppRoots: true
};
