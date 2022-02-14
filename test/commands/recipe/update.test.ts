import {expect, test} from '@oclif/test'

describe('updates a recipe', () => {
  test
  .stdout()
  .command(['recipe:create', 'pancakes', '--instructions', 'old instructions'])
  .command(['recipe:update', 'pancakes', '--instructions', 'new instructions'])
  .it('runs recipe create', ctx => {
    expect(ctx.stdout).to.contain('Updated recipe: pancakes')
  })
})
