export interface Product {
  id: string
  name: string
  category: string
  price: number
}

export interface ProductFilters {
  searchTerm: string
  category: string
  maxPrice: string
}

export const products: Product[] = [
  { id: 'trail-backpack', name: 'Trail Backpack', category: 'Bags', price: 74.99 },
  { id: 'canvas-tote', name: 'Canvas Tote', category: 'Bags', price: 29.99 },
  { id: 'steel-bottle', name: 'Steel Bottle', category: 'Accessories', price: 24.99 },
  { id: 'running-jacket', name: 'Running Jacket', category: 'Apparel', price: 119.99 },
  { id: 'ceramic-mug', name: 'Ceramic Mug', category: 'Home', price: 18.5 },
  { id: 'wool-beanie', name: 'Wool Beanie', category: 'Apparel', price: 32 },
]

export function filterProducts(
  catalog: readonly Product[],
  filters: ProductFilters,
): Product[] {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase()
  const maxPrice = filters.maxPrice.trim() === '' ? null : Number(filters.maxPrice)

  return catalog.filter((product) => {
    const matchesSearch =
      normalizedSearch === '' ||
      product.name.toLowerCase().includes(normalizedSearch)
    const matchesCategory =
      filters.category === '' || product.category === filters.category
    const matchesPrice = maxPrice === null || product.price <= maxPrice

    return matchesSearch && matchesCategory && matchesPrice
  })
}
