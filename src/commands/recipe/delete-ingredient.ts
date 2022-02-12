import {Command, Flags} from '@oclif/core'
import {recipes} from '../../repository/recipes'

export default class RecipeDeleteIngredient extends Command {
  static description = 'Deletes an ingredient from a recipe, if it exists'

  static examples = [
    'ccb recipe delete-ingredient pancakes --item=eggs',
  ]

  static flags = {
    item: Flags.string({char: 'i', description: 'Name of the ingredient to remove from the recipe', required: true}),
    quantity: Flags.integer({char: 'q', description: 'Quantity of the ingredient to remove'}),
  }

  static args = [{name: 'recipeName', description: 'Name of the recipe to remove an ingredient from', required: true}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(RecipeDeleteIngredient)
    const recipeName = args.recipeName ?? 'recipe'

    const deletedItem = recipes.deleteIngredient(recipeName, flags.item, flags.quantity ?? 0)
    if (deletedItem) {
      this.log(`${recipeName} now has ${deletedItem.quantity} ${deletedItem.unit} of ${deletedItem.name}`)
    } else {
      this.log(`Removed ${flags.item} from ${recipeName}`)
    }
  }
}
