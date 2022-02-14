import {BaseRepository} from './base-repository'
import {Recipe} from '../models/recipe'
import {InventoryItem} from '../models/inventory'

class Recipes extends BaseRepository {
  /**
   * Creates or updates a recipe
   * @param recipeName
   * @param instructions
   * @param update
   */
  create(recipeName: string, instructions: string, update = false) {
    if (update) {
      this.validateIngredientItem(recipeName)
    }

    const recipe = {name: recipeName, instructions: instructions, ingredients: []} as Recipe
    this.repository.push(`/${recipeName}`, recipe)
  }

  /**
   * Returns a recipe, ingredients, and its instructions
   * @param recipeName
   */
  getRecipe(recipeName: string): Recipe {
    this.validateIngredientItem(recipeName)
    return this.repository.getObject<Recipe>(`/${recipeName}`)
  }

  /**
   * Deletes a recipe
   * @param recipeName
   */
  delete(recipeName: string) {
    this.validateIngredientItem(recipeName)
    this.repository.delete(`/${recipeName}`)
  }

  /**
   * Adds an ingredient to a recipe
   * @param recipeName
   * @param itemName
   * @param quantity
   * @param unit
   */
  addIngredient(recipeName: string, itemName: string, quantity = 1, unit = 'count'): InventoryItem {
    this.validateIngredientItem(recipeName, quantity)
    const items = this.repository.getObject<InventoryItem[]>(`/${recipeName}/ingredients`)
    const index = items.map(i => i.name).indexOf(itemName)
    if (index >= 0) {
      items[index].unit = unit
      items[index].quantity = quantity + items[index].quantity
      this.repository.push(`/${recipeName}/ingredients`, items, true)
      return items[index]
    }

    const ingredient = {
      name: itemName,
      unit: unit,
      quantity: quantity,
    } as InventoryItem
    this.repository.push(`/${recipeName}/ingredients[]`, ingredient, true)
    return ingredient
  }

  /**
   * Deletes an ingredient from a recipe
   * @param recipeName
   * @param item
   * @param quantity
   */
  deleteIngredient(recipeName: string, item: string, quantity: number): InventoryItem | null {
    this.validateIngredientItem(recipeName, quantity)
    const items = this.repository.getObject<InventoryItem[]>(`/${recipeName}/ingredients`)
    const index = items.map(i => i.name).indexOf(item)
    if (index >= 0) {
      if (quantity > 0) {
        // Remove a quantity of the item
        items[index].quantity -= quantity
        if (items[index].quantity <= 0) {
          // If no quantity of the item remain, remove the item entirely
          this.repository.delete(`/${recipeName}/ingredients[${index}]`)
        } else {
          this.repository.push(`/${recipeName}/ingredients`, items, true)
          return items[index]
        }
      } else {
        // Remove the item entirely
        this.repository.delete(`/${recipeName}/ingredients[${index}]`)
      }
    } else {
      throw new Error(`Recipe ${recipeName} doesn't contain ${item}.`)
    }

    return null
  }

  /**
   * Validates a recipe and its ingredients
   * @param recipeName
   * @param quantity
   * @private
   */
  private validateIngredientItem(recipeName: string, quantity = 0) {
    if (quantity < 0) {
      throw new Error('Quantity must be bigger than 0')
    }

    try {
      return Boolean(this.repository.getData(`/${recipeName}`))
    } catch {
      throw new Error(`Recipe ${recipeName} doesn't exist.`)
    }
  }
}

export const recipes = new Recipes('recipes')
