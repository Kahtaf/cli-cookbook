import {Command} from '@oclif/core'
import {inventories} from '../../repository/inventories'

export default class InventoryCreate extends Command {
  static description = 'Creates a new inventory'

  static examples = [
    'ccb inventory create myFridge',
  ]

  static flags = {}

  static args = [{name: 'inventoryName', description: 'Name of the inventory to create', required: true}]

  public async run(): Promise<void> {
    const {args} = await this.parse(InventoryCreate)
    const inventoryName = args.inventoryName ?? 'inventory'

    inventories.create(inventoryName)
    this.log(`Created a new inventory: ${inventoryName}`)
  }
}
