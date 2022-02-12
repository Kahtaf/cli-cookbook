import {Command, Flags} from '@oclif/core'
import {recipes} from '../../repository/recipes'

export default class RecipeAddIngredient extends Command {
  static description = 'Adds an ingredient to the specified recipe'

  static examples = [
    'ccb recipe add-ingredient pancakes --item=eggs --quantity=1 --unit=count',
  ]

  static flags = {
    item: Flags.string({char: 'i', description: 'Name of the ingredient to add to the recipe', required: true}),
    quantity: Flags.integer({char: 'q', description: 'Quantity of the ingredient to add'}),
    unit: Flags.string({char: 'u', description: 'Unit of the ingredient (count, cups, liters)'}),
  }

  static args = [{name: 'recipeName', description: 'Name of the recipe to add an ingredient to', required: true}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(RecipeAddIngredient)
    const recipeName = args.recipeName ?? 'recipe'

    const ingredient = recipes.addIngredient(recipeName, flags.item, flags.quantity, flags.unit)
    this.log(`${recipeName} now has ${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`)
  }
}
