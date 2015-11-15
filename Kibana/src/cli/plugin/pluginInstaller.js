'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _ = require('lodash');
var utils = require('requirefrom')('src/utils');
var fromRoot = utils('fromRoot');
var pluginDownloader = require('./pluginDownloader');
var pluginCleaner = require('./pluginCleaner');
var KbnServer = require('../../server/KbnServer');
var readYamlConfig = require('../serve/readYamlConfig');
var fs = require('fs');

module.exports = {
  install: install
};

function install(settings, logger) {
  logger.log('Installing ' + settings['package']);

  try {
    fs.statSync(settings.pluginPath);

    logger.error('Plugin ' + settings['package'] + ' already exists, please remove before installing a new version');
    process.exit(70); // eslint-disable-line no-process-exit
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }

  var cleaner = pluginCleaner(settings, logger);
  var downloader = pluginDownloader(settings, logger);

  return cleaner.cleanPrevious().then(function () {
    return downloader.download();
  }).then(function callee$1$0() {
    var serverConfig, kbnServer;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          logger.log('Optimizing and caching browser bundles...');
          serverConfig = _.merge(readYamlConfig(settings.config), {
            env: 'production',
            logging: {
              silent: settings.silent,
              quiet: !settings.silent,
              verbose: false
            },
            optimize: {
              useBundleCache: false
            },
            server: {
              autoListen: false
            },
            plugins: {
              initialize: false,
              scanDirs: [settings.pluginDir, fromRoot('src/plugins')],
              paths: [settings.workingPath]
            }
          });
          kbnServer = new KbnServer(serverConfig);
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(kbnServer.ready());

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(kbnServer.close());

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }).then(function () {
    fs.renameSync(settings.workingPath, settings.pluginPath);
    logger.log('Plugin installation complete');
  })['catch'](function (e) {
    logger.error('Plugin installation was unsuccessful due to error "' + e.message + '"');
    cleaner.cleanError();
    process.exit(70); // eslint-disable-line no-process-exit
  });
}
