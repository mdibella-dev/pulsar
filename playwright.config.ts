module.exports = {
  testDir: 'tests',
  timeout: 60000,
  expect: {
    toMatchSnapshot: {threshold: 0.2},
  }
}
