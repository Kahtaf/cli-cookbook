import {expect} from '@oclif/test'
import {recipes} from '../../src/repository/recipes'

describe('recipes', () => {
  describe('getRecipe()', () => {
    it('should get ingredients from a recipe that exists', () => {
      const recipe = recipes.getRecipe('pancakes')
      expect(recipe.instructions.length).to.gt(0)
    })

    it('should throw an error when a recipe does not exist', () => {
      const recipeName = 'non-existent-recipe'
      expect(() => recipes.getRecipe(recipeName)).to.throw(`Recipe ${recipeName} doesn't exist.`)
    })
  })

  describe('addIngredient()', () => {
    it('should add an ingredient to a recipe', () => {
      const item = recipes.addIngredient('pancakes', 'flour', 1, 'bag')
      expect(item.quantity).to.eq(1)
    })

    it('should append more quantity to an existing item', () => {
      const item = recipes.addIngredient('pancakes', 'flour', 1, 'bag')
      expect(item.quantity).to.eq(2)
    })
  })

  describe('deleteIngredient()', () => {
    it('should remove an item from an inventory', () => {
      const item = recipes.deleteIngredient('pancakes', 'flour', 500)
      expect(item).to.be.null
    })
  })
})
