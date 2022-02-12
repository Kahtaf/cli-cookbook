import {expect, test} from '@oclif/test'

describe('recipe:make', () => {
  test
  .stdout()
  .command(['recipe:make'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['recipe:make', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
