const p = require('playwright');
const electron = p._electron
const { test, expect } = require('@playwright/test');

test('Checking that Atom opens at the welcome page', async () => {
  const env = process.env
  env.ATOM_HOME = "/tmp/atom-home-tests"
  const electronApp = await electron.launch({
    args: ["src/main-process/main.js"],
    cwd: "./",
    env: env,
    // recordVideo: {
    //   dir: "/tmp/video.mp4"
    // },
    timeout: 10000
  });

  const page = await electronApp.firstWindow();

  const workspace = page.locator('atom-workspace')
  await expect(workspace).toHaveText(/A hackable text editor/, {
    useInnerText: true,
  });
  await electronApp.close();
});
