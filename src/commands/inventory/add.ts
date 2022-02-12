import {Command, Flags} from '@oclif/core'
import {inventories} from '../../repository/inventories'

export default class InventoryAdd extends Command {
  static description = 'Add an item to the specified inventory'

  static examples = [
    'ccb inventory add myFridge --item=eggs --quantity=1 --unit=count',
  ]

  static flags = {
    item: Flags.string({char: 'i', description: 'Name of the item to add to the inventory', required: true}),
    quantity: Flags.integer({char: 'q', description: 'Quantity of the item to add'}),
    unit: Flags.string({char: 'u', description: 'Unit of the item (count, cups, liters)'}),
  }

  static args = [{name: 'inventoryName', description: 'Name of the inventory to add an item to', required: true}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(InventoryAdd)
    const inventoryName = args.inventoryName ?? 'inventory'

    const addedItem = inventories.addItem(inventoryName, flags.item, flags.quantity, flags.unit)
    this.log(`${inventoryName} now has ${addedItem.quantity} ${addedItem.unit} of ${addedItem.name}`)
  }
}
