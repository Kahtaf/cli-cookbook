import {expect, test} from '@oclif/test'

describe('deletes an ingredient from a recipe', () => {
  test
  .stdout()
  .command(['recipe:create', 'pancakes', '--instructions', 'test'])
  .command(['recipe:add-ingredient', 'pancakes', '--item', 'eggs'])
  .command(['recipe:delete-ingredient', 'pancakes', '--item', 'eggs'])
  .it('runs recipe delete ingredient', ctx => {
    expect(ctx.stdout).to.match(/pancakes now has .* count of eggs/)
  })
})
