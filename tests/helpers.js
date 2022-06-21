const os=require('os')
const path = require('path')
const p = require('playwright')
const electron = p._electron
const { expect } = require('@playwright/test')

async function openAtom(profilePath, videoName) {
  const env = process.env
  env.ATOM_HOME = profilePath
  env.APM_PATH = "apm/node_modules/atom-package-manager/bin/apm"

  const config = {
    args: ["--no-sandbox", "."],
    cwd: "./",
    env: env,
    timeout: 10000
  }
  if(process.env.CI) {
    config.recordVideo = {
      dir: path.join('tests', 'videos', videoName)
    }
  }
  const app = await electron.launch(config)
  const page = await app.firstWindow()

  return {app, page}
}

async function runCommand({page}, command) {
  if(os.platform() === 'darwin') {
    await page.locator('atom-workspace').press('Meta+Shift+p')
  } else {
    await page.locator('atom-workspace').press('Control+Shift+p')
  }
  await expect(page.locator('.modal:visible')).toBeVisible()
  const palette = page.locator('.command-palette atom-text-editor.is-focused')
  await palette.type(command)
  await page.locator('.selected div', { hasText: command }).first().click()
  await expect(page.locator('.modal:visible')).toBeHidden()
}

module.exports = {
  openAtom,
  runWorkspaceCommand,
  runEditorCommand,
  runCommand
}
