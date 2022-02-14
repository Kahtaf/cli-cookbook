import {BaseRepository} from './base-repository'
import {Inventory, InventoryItem} from '../models/inventory'

class Inventories extends BaseRepository {
  /**
   * Creates an inventory
   * @param inventoryName
   */
  create(inventoryName: string) {
    const inventory = {name: inventoryName, items: []} as Inventory
    this.repository.push(`/${inventoryName}`, inventory)
  }

  /**
   * Gets items from an existing inventory
   * @param inventoryName
   */
  getItems(inventoryName: string): InventoryItem[] {
    this.validateInventoryItem(inventoryName)
    return this.repository.getObject<InventoryItem[]>(`/${inventoryName}/items`)
  }

  /**
   * Delets an inventory and all its items
   * @param inventoryName
   */
  delete(inventoryName: string) {
    this.validateInventoryItem(inventoryName)
    this.repository.delete(`/${inventoryName}`)
  }

  /**
   * Adds an item (or increases quantity of an existing item) to an inventory
   * @param inventoryName
   * @param itemName
   * @param quantity
   * @param unit
   */
  addItem(inventoryName: string, itemName: string, quantity = 1, unit = 'count'): InventoryItem {
    this.validateInventoryItem(inventoryName, quantity)
    const items = this.repository.getObject<InventoryItem[]>(`/${inventoryName}/items`)
    const index = items.map(i => i.name).indexOf(itemName)
    if (index >= 0) {
      // Item already exists, add to the quantity
      items[index].unit = unit
      items[index].quantity = quantity + items[index].quantity
      this.repository.push(`/${inventoryName}/items`, items, true)
      return items[index]
    }

    // Item doesn't exist, add required amount of item
    const inventoryItem = {
      name: itemName,
      unit: unit,
      quantity: quantity,
    } as InventoryItem
    this.repository.push(`/${inventoryName}/items[]`, inventoryItem, true)
    return inventoryItem
  }

  /**
   * Deletes an item (or quantity of items) from an inventory
   * @param inventoryName
   * @param item
   * @param quantity
   */
  deleteItem(inventoryName: string, item: string, quantity: number): InventoryItem | null {
    this.validateInventoryItem(inventoryName, quantity)
    const items = this.repository.getObject<InventoryItem[]>(`/${inventoryName}/items`)
    const index = items.map(i => i.name).indexOf(item)
    if (index >= 0) {
      if (quantity > 0) {
        // Remove a quantity of the item
        items[index].quantity -= quantity
        if (items[index].quantity <= 0) {
          // If no quantity of the item remain, remove the item entirely
          this.repository.delete(`/${inventoryName}/items[${index}]`)
        } else {
          this.repository.push(`/${inventoryName}/items`, items, true)
          return items[index]
        }
      } else {
        // Remove the item entirely
        this.repository.delete(`/${inventoryName}/items[${index}]`)
      }
    } else {
      throw new Error(`Inventory ${inventoryName} doesn't contain ${item}.`)
    }

    return null
  }

  /**
   * Validates if an inventory exists, and items of an inventory
   * @param inventoryName
   * @param quantity
   * @private
   */
  private validateInventoryItem(inventoryName: string, quantity = 0) {
    if (quantity < 0) {
      throw new Error('Quantity must be bigger than 0')
    }

    try {
      return Boolean(this.repository.getData(`/${inventoryName}`))
    } catch {
      throw new Error(`Inventory ${inventoryName} doesn't exist.`)
    }
  }
}

export const inventories = new Inventories('inventories')
