import {BaseRepository} from './base-repository'

class Recipes extends BaseRepository {
  create(recipeName: string, instructions: string, update = false) {
    if (update) {
      this.validateIngredientItem(recipeName)
    }

    const recipe = {name: recipeName, instructions: instructions, ingredients: []} as Recipe
    this.repository.push(`/${recipeName}`, recipe)
  }

  getRecipe(recipeName: string): Recipe {
    this.validateIngredientItem(recipeName)
    return this.repository.getObject<Recipe>(`/${recipeName}`)
  }

  delete(recipeName: string) {
    this.validateIngredientItem(recipeName)
    this.repository.delete(`/${recipeName}`)
  }

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
