import {expect, test} from '@oclif/test'

describe('deletes an inventory', () => {
  test
  .stdout()
  .command(['inventory:create', 'test-inventory'])
  .command(['inventory:delete', 'test-inventory'])
  .it('runs inventory delete', ctx => {
    expect(ctx.stdout).to.contain('Removed inventory test-inventory')
  })

  test
  .stderr()
  .command(['inventory:delete', 'non-existing'])
  .catch(error => {
    expect(error.message).to.contain('Inventory non-existing doesn\'t exist.')
  })
  .it('requires existing inventory')
})

