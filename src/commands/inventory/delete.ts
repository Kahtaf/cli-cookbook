import {Command, Flags} from '@oclif/core'
import {inventories} from '../../repository/inventories'

export default class InventoryDelete extends Command {
  static description = 'Deletes an item from an inventory, if it exists'

  static examples = [
    'ccb inventory delete myFridge --item=eggs',
  ]

  static flags = {
    item: Flags.string({char: 'i', description: 'Name of the item to remove from the inventory', required: true}),
    quantity: Flags.integer({char: 'q', description: 'Quantity of the item to remove'}),
  }

  static args = [{name: 'inventoryName', description: 'Name of the inventory to remove an item from', required: true}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(InventoryDelete)
    const inventoryName = args.inventoryName ?? 'inventory'

    const deletedItem = inventories.deleteItem(inventoryName, flags.item, flags.quantity ?? 0)
    if (deletedItem) {
      this.log(`${inventoryName} now has ${deletedItem.quantity} ${deletedItem.unit} of ${deletedItem.name}`)
    } else {
      this.log(`Removed ${flags.item} from ${inventoryName}`)
    }
  }
}
