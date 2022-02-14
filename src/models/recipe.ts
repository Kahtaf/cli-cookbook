import {InventoryItem} from './inventory'

export interface Recipe {
  name: string
  instructions: string
  ingredients: InventoryItem[]
}
