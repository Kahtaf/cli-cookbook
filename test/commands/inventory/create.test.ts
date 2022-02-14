import {expect, test} from '@oclif/test'

describe('create an inventory', () => {
  test
  .stdout()
  .command(['inventory:create', 'myFridge'])
  .it('runs inventory create', ctx => {
    expect(ctx.stdout).to.contain('Created a new inventory')
  })
})

