interface Inventory {
  name: string
  items: InventoryItems[]
}

interface InventoryItems {
  name: string
  quantity: number
  unit: string
}
