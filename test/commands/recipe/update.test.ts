import {expect, test} from '@oclif/test'

describe('recipe:update', () => {
  test
  .stdout()
  .command(['recipe:update'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['recipe:update', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
