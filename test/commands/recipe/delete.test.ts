import {expect, test} from '@oclif/test'

describe('deletes a recipe', () => {
  test
  .stdout()
  .command(['recipe:create', 'pancakes', '--instructions', 'to delete'])
  .command(['recipe:delete', 'pancakes'])
  .it('runs recipe delete', ctx => {
    expect(ctx.stdout).to.contain('Removed pancakes from cookbook')
  })
})
