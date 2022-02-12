interface Inventory {
  name: string
  items: InventoryItem[]
}

interface InventoryItem {
  name: string
  quantity: number
  unit: string
}
