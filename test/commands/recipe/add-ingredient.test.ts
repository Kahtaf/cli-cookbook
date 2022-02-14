import {expect, test} from '@oclif/test'

describe('adds ingredient to recipe', () => {
  test
  .stdout()
  .command(['recipe:add-ingredient', 'pancakes', '--item', 'eggs', '--quantity', '1', '--unit', 'count'])
  .it('runs recipe add-ingredient', ctx => {
    expect(ctx.stdout).to.match(/pancakes now has .*\d count of eggs/i)
  })
})
