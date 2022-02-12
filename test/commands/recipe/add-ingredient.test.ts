import {expect, test} from '@oclif/test'

describe('recipe:add-ingredient', () => {
  test
  .stdout()
  .command(['recipe:add-ingredient'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['recipe:add-ingredient', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
