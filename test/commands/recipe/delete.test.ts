import {expect, test} from '@oclif/test'

describe('recipe:delete', () => {
  test
  .stdout()
  .command(['recipe:delete'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['recipe:delete', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
