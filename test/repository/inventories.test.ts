import {expect} from '@oclif/test'
import {inventories} from '../../src/repository/inventories'

describe('inventories', () => {
  describe('getItems()', () => {
    it('should get items in an inventory that exists', () => {
      inventories.addItem('myFridge', 'flour', 500, 'bag')
      const items = inventories.getItems('myFridge')
      expect(items.length).to.gt(0)
      inventories.deleteItem('myFridge', 'flour', 500)
    })

    it('should throw an error when an inventory does not exist', () => {
      const inventoryName = 'non-existent-inventory'
      expect(() => inventories.getItems(inventoryName)).to.throw(`Inventory ${inventoryName} doesn't exist.`)
    })
  })

  describe('addItem()', () => {
    it('should add an item to an inventory', () => {
      const item = inventories.addItem('myFridge', 'flour', 1, 'bag')
      expect(item.quantity).to.eq(1)
    })

    it('should append more quantity to an existing item', () => {
      const item = inventories.addItem('myFridge', 'flour', 1, 'bag')
      expect(item.quantity).to.eq(2)
    })
  })

  describe('removeItem()', () => {
    it('should remove an item from an inventory', () => {
      const item = inventories.deleteItem('myFridge', 'flour', 500)
      expect(item).to.be.null
    })
  })
})
