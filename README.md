# Testing - Your First Unit Test

## Setup

```
npm install
npm test              # runs Jest
npm run test:watch    # runs Jest in watch mode
npm run test:coverage # runs Jest with a coverage report
```

`src/orderUtils.js` contains four standalone functions from a small order-processing
utility. None of them call each other, so each can be tested completely on its own.

---

## Requirements spec

### 1. `calculateTotal(cart, discountAmount)`
- `cart` is an array of items, each `{ price, quantity }`.
- Returns the sum of `price * quantity` across all items, minus `discountAmount`.
- The result should never be negative - if the discount is larger than the
  cart's value, the total is `0`.

### 2. `applyDiscountCode(price, code)`
- Returns `price` after applying a discount code:
  - `"SAVE10"` -> 10% off
  - `"SAVE20"` -> 20% off
  - anything else (including no code) -> no discount, return `price` unchanged
- Codes are case-insensitive - `"save10"` and `"SAVE10"` must behave the same.

### 3. `getShippingDetails(cart, destination)`
- `cart` is an array of items, each `{ price, quantity }`.
- Returns an object: `{ cost, method }`.
- If `destination` is `"international"`: `{ cost: 20, method: 'international' }`.
- Otherwise (domestic):
  - Subtotal is **$50 or more** -> free shipping: `{ cost: 0, method: 'free' }`.
  - Subtotal is under $50 -> `{ cost: 5, method: 'standard' }`.

### 4. `getBulkDiscountRate(cart)`
- `cart` is an array of items, each `{ price, quantity }`.
- Returns a discount rate based on the **total quantity across all items**
  in the cart:
  - 10 or more total items -> `0.15`
  - 5-9 total items -> `0.05`
  - fewer than 5 -> `0`
