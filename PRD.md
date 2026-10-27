# Product Requirements: hor-webshop-filter

## Scope

A client-side product catalog demo with filters over a small sample catalog. Product data is static; checkout, inventory, and backend integration are out of scope.

## Requirements

### PRD-001: Show the product catalog

Display every catalog product with its name, category, and price formatted in US dollars.

### PRD-002: Filter products

Allow shoppers to filter by a case-insensitive, trimmed product-name search, an exact category, and an inclusive maximum price. When multiple filters are active, only products matching every active filter are shown.

### PRD-003: Clear filters

Provide a clear action that empties all filter controls and restores the complete catalog.

### PRD-004: Explain empty results

When no products match, show a clear empty-state message and report zero results.

### PRD-005: Keep filtering accessible

Give each filter control a programmatic label and announce the changing result count through a polite live status.

## Verification

| Requirement | Explicit test coverage |
|---|---|
| PRD-001 | `src/App.test.tsx` — renders every catalog item's name, category, and USD price |
| PRD-002 | `src/products.test.ts` — covers search normalization, category, inclusive price, combined filters, and no matches; `src/App.test.tsx` — verifies filters through the UI |
| PRD-003 | `src/App.test.tsx` — clears all controls and restores all products |
| PRD-004 | `src/App.test.tsx` — shows the empty-state message and zero count |
| PRD-005 | `src/App.test.tsx` — checks labeled controls and the polite live status |
