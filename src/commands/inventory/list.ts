import {CliUx, Command} from '@oclif/core'
import {inventories} from '../../repository/inventories'
import {InventoryItem} from '../../models/inventory'

export default class InventoryList extends Command {
  static description = 'Lists all items in an inventory'

  static examples = [
    'ccb inventory list myFridge',
  ]

  static flags = {}

  static args = [{name: 'inventoryName', description: 'Name of the inventory to list', required: true}]

  public async run(): Promise<void> {
    const {args} = await this.parse(InventoryList)
    const inventoryName = args.inventoryName ?? 'inventory'

    const items: InventoryItem[] = inventories.getItems(inventoryName)
    this.log(`List of items in ${inventoryName}`)

    // Render a table from records
    CliUx.ux.table(items as Record<string, any>[], {
      name: {
        header: 'Item',
        minWidth: 20,
      },
      quantity: {
        get: row => `${row.quantity} ${row.unit}`,
      },
    })
  }
}
