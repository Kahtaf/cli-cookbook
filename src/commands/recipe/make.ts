import {CliUx, Command, Flags} from '@oclif/core'
import {inventories} from '../../repository/inventories'
import {recipes} from '../../repository/recipes'

export default class RecipeMake extends Command {
  static description = 'Checks recipes against an inventory to see if we can make it'

  static examples = [
    'ccb recipe make pancakes --inventory=myFridge',
    'ccb recipe make "pancakes,waffles" --inventory=myFridge',
  ]

  static flags = {
    inventory: Flags.string({char: 'i', description: 'Inventory to check against', required: true}),
  }

  static args = [{name: 'recipeName', description: 'Name (or names) of the recipe(s) to create', required: true}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(RecipeMake)
    const recipeNames = (args.recipeName ?? 'recipe').split(',')
    const inventoryItems = inventories.getItems(flags.inventory)

    for (const recipeName of recipeNames) {
      const ingredients = recipes.getItems(recipeName)
      const checkedIngredients = []

      this.log(`\nChecking recipe: ${recipeName}`)
      for (const ingredient of ingredients) {
        const availableItem = inventoryItems.find(i => i.name === ingredient.name)
        const checkedIngredient = {
          name: ingredient.name,
          unit: ingredient.unit,
          quantityRequired: ingredient.quantity,
          quantityAvailable: availableItem ? availableItem.quantity : 0,
          quantityMissing: 0,
        }

        const quantityMissing = checkedIngredient.quantityAvailable - ingredient.quantity
        if (quantityMissing < 0) {
          checkedIngredient.quantityMissing = Math.abs(quantityMissing)
        }
        checkedIngredients.push(checkedIngredient)
      }

      CliUx.ux.table(checkedIngredients as Record<string, any>[], {
        name: {
          header: 'Ingredient',
          minWidth: 20,
        },
        quantityRequired: {
          header: 'Quantity',
          minWidth: 10,
          get: row => `${row.quantityRequired} ${row.unit}`,
        },
        quantityAvailable: {
          header: 'Available',
          minWidth: 10,
          get: row => `${row.quantityAvailable} ${row.unit}`,
        },
        quantityMissing: {
          header: 'Missing ingredients',
          minWidth: 10,
          get: row => row.quantityMissing > 0 ? `${row.quantityMissing} ${row.unit}` : '-',
        },
      })
    }
  }
}
