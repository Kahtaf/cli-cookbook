import {expect, test} from '@oclif/test'

describe('lists items in the inventory', () => {
  test
  .stdout()
  .command(['inventory:add-item', 'myFridge', '--item', 'eggs', '--quantity', '1', '--unit', 'count'])
  .command(['inventory:list', 'myFridge'])
  .command(['inventory:delete-item', 'myFridge', '--item', 'eggs'])
  .it('runs inventory list', ctx => {
    expect(ctx.stdout).to.match(/eggs .* 1 count/)
  })
})

