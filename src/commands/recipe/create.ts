import {Command, Flags} from '@oclif/core'
import {recipes} from '../../repository/recipes'

export default class RecipeCreate extends Command {
  static description = 'Creates a new recipe'

  static examples = [
    'ccb recipe create pancakes --instructions="" ',
  ]

  static flags = {
    instructions: Flags.string({char: 'i', description: 'Instructions to make the recipe', required: true}),
  }

  static args = [{name: 'recipeName', description: 'Name of the recipe to create', required: true}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(RecipeCreate)
    const recipeName = args.recipeName ?? 'recipe'

    recipes.create(recipeName, flags.instructions)
    this.log(`Created new recipe: ${recipeName}`)
  }
}
