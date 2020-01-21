module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine',
      '@angular-devkit/build-angular'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false,
      jasmine: {
        random: false
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: [
        'text-summary',
        'html'
      ],
      fixWebpackSourcePaths: true
    },
    reporters: [
      'progress',
      'kjhtml',
      'coverage-istanbul'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browserDisconnectTimeout: 60 * 1000,
    processKillTimeout: 60 * 1000,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 60 * 2 * 1000,
    captureTimeout: 60 * 2 * 1000,
    browserSocketTimeout: 60 * 2 * 1000,
    retryLimit: 5,
    browsers: [
      'Chrome'
    ],
    singleRun: false
  });
};
