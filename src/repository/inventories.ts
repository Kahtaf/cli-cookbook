import {BaseRepository} from './base-repository'

class Inventories extends BaseRepository {
  create(inventoryName: string) {
    const inventory = {name: inventoryName, items: []} as Inventory
    this.repository.push(`/${inventoryName}`, inventory)
  }
}

export const inventories = new Inventories('inventories')
