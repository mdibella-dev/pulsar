'use strict';

const childProcess = require('child_process');

const CONFIG = require('../config');

function installApm(ci = false, showVersion = true) {
  console.log('Installing apm');
  childProcess.execFileSync(
    CONFIG.getPnpmBinPath(),
    ['--loglevel=error', 'install'],
    { env: process.env, cwd: CONFIG.apmRootPath }
  );
  if (showVersion) {
    childProcess.execFileSync(CONFIG.getApmBinPath(), ['--version'], {
      stdio: 'inherit'
    });
  }
}

const { expose } = require(`${CONFIG.scriptRunnerModulesPath}/threads/worker`);
expose(installApm);
module.exports = installApm;
