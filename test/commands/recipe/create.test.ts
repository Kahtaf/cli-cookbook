import {expect, test} from '@oclif/test'

describe('create a recipe', () => {
  test
  .stderr()
  .command(['recipe:create', 'pancakes'])
  .catch(error => {
    expect(error.message).to.match(/Missing required flag:\n -i, --instructions .*/)
  })
  .it('requires instructions')

  test
  .stdout()
  .command(['recipe:create', 'pancakes', '--instructions', 'add water'])
  .it('runs recipe create', ctx => {
    expect(ctx.stdout).to.contain('Created new recipe: pancakes')
  })
})
