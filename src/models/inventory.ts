export interface Inventory {
  name: string
  items: InventoryItem[]
}

export interface InventoryItem {
  name: string
  quantity: number
  unit: string
}
