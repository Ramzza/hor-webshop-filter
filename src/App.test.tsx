import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('webshop filter requirements', () => {
  it('PRD-001 renders every product with its category and USD price', () => {
    render(<App />)

    const expectedProducts = [
      ['Trail Backpack', 'Bags', '$74.99'],
      ['Canvas Tote', 'Bags', '$29.99'],
      ['Steel Bottle', 'Accessories', '$24.99'],
      ['Running Jacket', 'Apparel', '$119.99'],
      ['Ceramic Mug', 'Home', '$18.50'],
      ['Wool Beanie', 'Apparel', '$32.00'],
    ]

    expect(screen.getAllByRole('article')).toHaveLength(expectedProducts.length)

    for (const [name, category, price] of expectedProducts) {
      const card = screen.getByRole('article', { name })

      expect(card).toHaveTextContent(category)
      expect(within(card).getByText(price)).toBeInTheDocument()
    }
  })

  it('PRD-002 applies a case-insensitive name search', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: 'Search products' }),
      'cAnVaS',
    )

    expect(screen.getByRole('article', { name: 'Canvas Tote' })).toBeInTheDocument()
    expect(screen.queryByRole('article', { name: 'Trail Backpack' })).not.toBeInTheDocument()
  })

  it('PRD-002 filters by category', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Category' }),
      'Apparel',
    )

    expect(screen.getByRole('article', { name: 'Running Jacket' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Wool Beanie' })).toBeInTheDocument()
    expect(screen.queryByRole('article', { name: 'Canvas Tote' })).not.toBeInTheDocument()
  })

  it('PRD-002 includes products at the maximum price', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('spinbutton', { name: 'Maximum price' }),
      '29.99',
    )

    expect(screen.getByRole('article', { name: 'Canvas Tote' })).toBeInTheDocument()
    expect(screen.queryByRole('article', { name: 'Trail Backpack' })).not.toBeInTheDocument()
  })

  it('PRD-002 combines search, category, and maximum price filters', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: 'Search products' }),
      'a',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Category' }),
      'Bags',
    )
    await user.type(
      screen.getByRole('spinbutton', { name: 'Maximum price' }),
      '29.99',
    )

    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('article', { name: 'Canvas Tote' })).toBeInTheDocument()
  })

  it('PRD-003 clears all controls and restores the catalog', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: 'Search products' }),
      'canvas',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Category' }),
      'Bags',
    )
    await user.type(
      screen.getByRole('spinbutton', { name: 'Maximum price' }),
      '29.99',
    )
    await user.click(screen.getByRole('button', { name: 'Clear filters' }))

    expect(screen.getByRole('searchbox', { name: 'Search products' })).toHaveValue('')
    expect(screen.getByRole('combobox', { name: 'Category' })).toHaveValue('')
    expect(screen.getByRole('spinbutton', { name: 'Maximum price' })).toHaveValue(null)
    expect(screen.getByRole('status')).toHaveTextContent('6 products found')
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })

  it('PRD-004 explains when no products match', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: 'Search products' }),
      'not in this catalog',
    )

    expect(screen.getByRole('status')).toHaveTextContent('0 products found')
    expect(screen.getByText('No products match your filters.')).toBeInTheDocument()
    expect(screen.queryAllByRole('article')).toHaveLength(0)
  })

  it('PRD-005 labels the controls and announces the result count politely', () => {
    render(<App />)

    expect(screen.getByRole('searchbox', { name: 'Search products' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Category' })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: 'Maximum price' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  })
})
