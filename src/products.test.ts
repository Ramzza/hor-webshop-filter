import { describe, expect, it } from 'vitest'
import { filterProducts, products } from './products'

describe('PRD-002 product filtering', () => {
  it('matches a trimmed, case-insensitive product-name search', () => {
    const result = filterProducts(products, {
      searchTerm: '  cAnVaS  ',
      category: '',
      maxPrice: '',
    })

    expect(result.map((product) => product.name)).toEqual(['Canvas Tote'])
  })

  it('filters by the selected category', () => {
    const result = filterProducts(products, {
      searchTerm: '',
      category: 'Apparel',
      maxPrice: '',
    })

    expect(result.map((product) => product.name)).toEqual([
      'Running Jacket',
      'Wool Beanie',
    ])
  })

  it('treats the maximum price as inclusive', () => {
    const result = filterProducts(products, {
      searchTerm: '',
      category: '',
      maxPrice: '29.99',
    })

    expect(result.map((product) => product.name)).toEqual([
      'Canvas Tote',
      'Steel Bottle',
      'Ceramic Mug',
    ])
  })

  it('requires every active filter to match', () => {
    const result = filterProducts(products, {
      searchTerm: 'a',
      category: 'Bags',
      maxPrice: '29.99',
    })

    expect(result.map((product) => product.name)).toEqual(['Canvas Tote'])
  })

  it('returns no products for an unmatched search', () => {
    const result = filterProducts(products, {
      searchTerm: 'not in this catalog',
      category: '',
      maxPrice: '',
    })

    expect(result).toEqual([])
  })
})
