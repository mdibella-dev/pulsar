const {openAtom, runCommand} = require('./helpers')
const { test, expect } = require('@playwright/test')

const languages = [
  {language: "JavaScript", code: 'function aFunction() { 10 }', checks: {numeric: '10', name: 'aFunction'}},
  {language: "Ruby", code: 'def a_function\n  10\nend', checks: {numeric: '10', name: 'a_function'}},
  {language: "Java", code: 'public int blah { return 10; }', checks: {numeric: '10', type: 'int'}},
]

let editor
test.describe('Opening Atom for the first time', () => {
  test.beforeAll(() =>
    openAtom("/tmp/atom-home-tests", "opening-first-time.mp4")
      .then(res => editor = res))

  test.afterAll(() => {
    editor.app.close()
  })

  test('the editor opens at the welcome page', async () => {
    const workspace = editor.page.locator('atom-workspace')
    await expect(workspace).toHaveText(/A hackable text editor/, {
      useInnerText: true,
    })
  })

  test.describe('the editor have syntax highlight', async () => {
    test.beforeAll(async () => {
      await runCommand(editor, 'Tabs: Close All Tabs')
    })

    languages.forEach(({language, code, checks}) => {
      test(`for ${language}`, async () => {
        await runCommand(editor, 'Application: New File')
        await editor.page.locator('atom-text-editor.is-focused').type(code)

        await editor.page.locator('grammar-selector-status').click()
        const modalInput = editor.page.locator(".modal:visible atom-text-editor.is-focused")
        await modalInput.type(language)
        await modalInput.press('Enter')

        await Promise.all(
          Object.keys(checks).map(k =>
            expect(syntaxElement(k)).toHaveText(checks[k])
          )
        )
      })
    })
  })
})

function syntaxElement(kind) {
  return editor.page.locator(`atom-text-editor.is-focused .syntax--${kind}`)
}
