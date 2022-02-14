import {Command} from '@oclif/core'
import {inventories} from '../../repository/inventories'

export default class InventoryDelete extends Command {
  static description = 'Deletes an inventory, if it exists'

  static examples = [
    'ccb inventory delete myFridge',
  ]

  static flags = {}

  static args = [{name: 'inventoryName', description: 'Name of the inventory to remove', required: true}]

  public async run(): Promise<void> {
    const {args} = await this.parse(InventoryDelete)
    const inventoryName = args.inventoryName ?? 'inventory'

    inventories.delete(inventoryName)
    this.log(`Removed inventory ${inventoryName}`)
  }
}
