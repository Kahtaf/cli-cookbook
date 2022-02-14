import {expect, test} from '@oclif/test'

describe('delete items from inventory', () => {
  test
  .stdout()
  .command(['inventory:add-item', 'myFridge', '--item', 'cheese'])
  .command(['inventory:delete-item', 'myFridge', '--item', 'cheese'])
  .it('deletes all of an item from inventory', ctx => {
    expect(ctx.stdout).to.contain('Removed cheese from myFridge')
  })

  test
  .stdout()
  .command(['inventory:add-item', 'myFridge', '--item', 'cheese', '--quantity', '5'])
  .command(['inventory:delete-item', 'myFridge', '--item', 'cheese', '--quantity', '3'])
  .command(['inventory:delete-item', 'myFridge', '--item', 'cheese', '--quantity', '2']) // cleanup
  .it('deletes some of an item from inventory', ctx => {
    expect(ctx.stdout).to.contain('myFridge now has 2 count of cheese')
  })
})
