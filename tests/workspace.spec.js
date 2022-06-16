const p = require('playwright');
const electron = p._electron
const { test, expect } = require('@playwright/test');

test('Checking that Atom opens at the welcome page', async () => {
  const env = process.env
  env.ATOM_HOME = "/tmp/atom-home-tests"
  env.APM_PATH = "apm/node_modules/.bin/apm"

  const config = {
    args: ["src/main-process/main.js"],
    cwd: "./",
    env: env,
    // recordVideo: {
    //   dir: "/tmp/video.mp4"
    // },
    timeout: 10000
  }
  const electronApp = await electron.launch(config);

  const page = await electronApp.firstWindow();

  const workspace = page.locator('atom-workspace')
  await expect(workspace).toHaveText(/A hackable text editor/, {
    useInnerText: true,
  });
  await electronApp.close();
});
