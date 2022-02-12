import {expect, test} from '@oclif/test'

describe('recipe:delete-ingredient', () => {
  test
  .stdout()
  .command(['recipe:delete-ingredient'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['recipe:delete-ingredient', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
