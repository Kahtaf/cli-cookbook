import {Command} from '@oclif/core'
import {recipes} from '../../repository/recipes'

export default class RecipeDelete extends Command {
  static description = 'Deletes an recipe from our cookbook, if it exists'

  static examples = [
    'ccb recipe delete pancakes',
  ]

  static flags = {}

  static args = [{name: 'recipeName', description: 'Name of the recipe to remove', required: true}]

  public async run(): Promise<void> {
    const {args} = await this.parse(RecipeDelete)
    const recipeName = args.recipeName ?? 'recipe'

    recipes.delete(recipeName)
    this.log(`Removed ${recipeName} from cookbook`)
  }
}
