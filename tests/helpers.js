const p = require('playwright')
const electron = p._electron
const { expect } = require('@playwright/test')

async function openAtom(profilePath, videoName) {
  const env = process.env
  env.ATOM_HOME = profilePath
  env.APM_PATH = "apm/node_modules/.bin/apm"

  const config = {
    args: ["src/main-process/main.js"],
    cwd: "./",
    env: env,
    timeout: 10000
  }
  if(process.env.CI) {
    config.recordVideo = {
      dir: videoName
    }
  }
  const app = await electron.launch(config)
  const page = await app.firstWindow()

  return {app, page}
}

// editor.page.evaluate(() => { eval(`atom.commands.dispatch(atom.views.getView(atom.workspace), "application:about")`) })

function runWorkspaceCommand(editor, command) {
  return editor.page.evaluate(`
    atom.commands.dispatch(
      atom.views.getView(atom.workspace),
      "${command}"
    )
  `)
}

function runEditorCommand(editor, command) {
  return editor.page.evaluate(`
    atom.commands.dispatch(
      atom.views.getView(atom.workspace.getActiveTextEditor()),
      "${command}"
    )
  `)
}

async function runCommand({page}, command) {
  await page.locator('atom-workspace').press('Control+Shift+p')
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
