import {expect, test} from '@oclif/test'

describe('add item to inventory', () => {
  test
  .stdout()
  .command(['inventory:add-item', 'myFridge', '--item', 'eggs', '--quantity', '1', '--unit', 'count'])
  .it('runs inventory add-item', ctx => {
    expect(ctx.stdout).to.match(/myfridge now has .*\d count of eggs/i)
  })
})

