import {Command, Flags} from '@oclif/core'
import {recipes} from '../../repository/recipes'

export default class RecipeUpdate extends Command {
  static description = 'Updates an existing recipe'

  static examples = [
    'ccb recipe update pancakes --instructions="instructions"',
  ]

  static flags = {
    instructions: Flags.string({char: 'i', description: 'Instructions to make the recipe', required: true}),
  }

  static args = [{name: 'recipeName', description: 'Name of the recipe to create', required: true}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(RecipeUpdate)
    const recipeName = args.recipeName ?? 'recipe'

    recipes.create(recipeName, flags.instructions, true)
    this.log(`Updated recipe: ${recipeName}`)
  }
}
