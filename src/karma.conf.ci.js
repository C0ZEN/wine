module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'parallel',
      'jasmine',
      '@angular-devkit/build-angular'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-parallel'),
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
        'text-summary'
      ],
      fixWebpackSourcePaths: true
    },
    reporters: [
      'progress'
    ],
    port: 9876,
    colors: false,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browserDisconnectTimeout: 60 * 1000,
    processKillTimeout: 60 * 1000,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 60 * 2 * 1000,
    captureTimeout: 60 * 2 * 1000,
    browserSocketTimeout: 60 * 2 * 1000,
    retryLimit: 5,
    browsers: [
      'ChromeHeadlessNoSandbox'
    ],
    singleRun: true,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-dev-shm-usage'
        ]
      }
    },
    parallelOptions: {
      executors: (Math.ceil(require('os').cpus().length / 2)),
      shardStrategy: 'round-robin'
    }
  });
};
