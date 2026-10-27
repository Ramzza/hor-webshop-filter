import { useState } from 'react'
import { filterProducts, products } from './products'
import './App.css'

const categories = ['Accessories', 'Apparel', 'Bags', 'Home']

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const filteredProducts = filterProducts(products, {
    searchTerm,
    category,
    maxPrice,
  })

  function clearFilters() {
    setSearchTerm('')
    setCategory('')
    setMaxPrice('')
  }

  return (
    <main className="storefront">
      <header className="hero">
        <p className="eyebrow">Good finds, thoughtfully gathered</p>
        <h1>Shop the collection</h1>
        <p className="hero-description">
          Find your next everyday favorite with a few simple filters.
        </p>
      </header>

      <div className="catalog-layout">
        <section className="filter-panel" aria-labelledby="filters-title">
          <div className="panel-heading">
            <p className="eyebrow">Make it yours</p>
            <h2 id="filters-title">Filters</h2>
          </div>

          <div className="filter-field">
            <label htmlFor="search">Search products</label>
            <input
              id="search"
              type="search"
              placeholder="Try “canvas”"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="filter-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="max-price">Maximum price</label>
            <div className="price-input">
              <span aria-hidden="true">$</span>
              <input
                id="max-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Any price"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </div>
          </div>

          <button className="clear-button" type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </section>

        <section className="products-area" aria-labelledby="products-title">
          <div className="results-heading">
            <div>
              <p className="eyebrow">A little something for every day</p>
              <h2 id="products-title">The collection</h2>
            </div>
            <p className="result-count" role="status" aria-live="polite" aria-atomic="true">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                  aria-labelledby={`product-${product.id}`}
                >
                  <div className={`product-art product-art-${product.category.toLowerCase()}`}>
                    <span>{product.category}</span>
                  </div>
                  <div className="product-details">
                    <div>
                      <h3 id={`product-${product.id}`}>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                    </div>
                    <p className="product-price">{formatPrice(product.price)}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-state">No products match your filters.</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
