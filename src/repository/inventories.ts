import {BaseRepository} from './base-repository'

class Inventories extends BaseRepository {
  create(inventoryName: string) {
    const inventory = {name: inventoryName, items: []} as Inventory
    this.repository.push(`/${inventoryName}`, inventory)
  }

  getItems(inventoryName: string): InventoryItem[] {
    this.validateInventoryItem(inventoryName)
    return this.repository.getObject<InventoryItem[]>(`/${inventoryName}/items`)
  }

  delete(inventoryName: string) {
    this.validateInventoryItem(inventoryName)
    this.repository.delete(`/${inventoryName}`)
  }

  addItem(inventoryName: string, itemName: string, quantity = 1, unit = 'count'): InventoryItem {
    this.validateInventoryItem(inventoryName, quantity)
    const items = this.repository.getObject<InventoryItem[]>(`/${inventoryName}/items`)
    const index = items.map(i => i.name).indexOf(itemName)
    if (index >= 0) {
      items[index].unit = unit
      items[index].quantity = quantity + items[index].quantity
      this.repository.push(`/${inventoryName}/items`, items, true)
      return items[index]
    }

    const inventoryItem = {
      name: itemName,
      unit: unit,
      quantity: quantity,
    } as InventoryItem
    this.repository.push(`/${inventoryName}/items[]`, inventoryItem, true)
    return inventoryItem
  }

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
