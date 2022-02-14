import {expect, test} from '@oclif/test'

describe('checks a recipe against an inventory', () => {
  test
  .stderr()
  .command(['recipe:make', 'pancakes'])
  .catch(error => {
    expect(error.message).to.match(/Missing required flag:\n -i, --inventory .*/)
  })
  .it('requires inventory flag')

  test
  .stdout()
  .command(['recipe:create', 'pancakes', '--instructions', 'pancake instructions'])
  .command(['recipe:add-ingredient', 'pancakes', '--item', 'cinnamon'])
  .command(['recipe:make', 'pancakes', '--inventory', 'myFridge'])
  .command(['recipe:delete-ingredient', 'pancakes', '--item', 'cinnamon'])
  .it('shows missing items', ctx => {
    expect(ctx.stdout).to.match(/([\S\s]*?) Missing ([\S\s]*?) cinnamon([\S\s]*?)/)
  })

  test
  .stdout()
  .command(['recipe:make', 'pancakes,waffles', '--inventory', 'myFridge'])
  .it('shows multiple recipes', ctx => {
    expect(ctx.stdout).to.match(/\nRecipe: pancakes([\S\s]*?)Recipe: waffles([\S\s]*?)/)
  })
})
