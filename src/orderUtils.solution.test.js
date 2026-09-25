import {
  calculateTotal,
  applyDiscountCode,
  getShippingDetails,
  getBulkDiscountRate,
} from "./orderUtils";

describe("calculateTotal", () => {
  test("sums price * quantity across the cart, minus the discount", () => {
    // Arrange
    const cart = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 },
    ];
    const discount = 5;

    // Act
    const result = calculateTotal(cart, discount);

    // Assert
    expect(result).toBe(20); // (20 + 5) - 5
  });

  test("never returns a negative total, even if the discount exceeds the cart value", () => {
    // Arrange
    const cart = [{ price: 10, quantity: 1 }];
    const discount = 50;

    // Act
    const result = calculateTotal(cart, discount);

    // Assert
    expect(result).toBe(0); // bug: currently returns -40
  });
});

describe("applyDiscountCode", () => {
  test("applies 10% off for SAVE10", () => {
    // Same Arrange -> Act -> Assert approach, but collapsed for conciseness
    expect(applyDiscountCode(100, "SAVE10")).toBe(90);
  });

  test("applies 20% off for SAVE20", () => {
    expect(applyDiscountCode(100, "SAVE20")).toBe(80);
  });

  test("leaves price unchanged for an unrecognized code", () => {
    expect(applyDiscountCode(100, "NOTREAL")).toBe(100);
  });

  test("codes are case-insensitive", () => {
    expect(applyDiscountCode(100, "save10")).toBe(90); // bug: currently returns 100
  });
});

describe("getShippingDetails", () => {
  test("international orders always cost $20, regardless of subtotal", () => {
    const cart = [{ price: 5, quantity: 1 }];
    const result = getShippingDetails(cart, "international");

    expect(result.cost).toBe(20);
    expect(result.method).toBe("international");
  });

  test("domestic orders under $50 get standard shipping for $5", () => {
    const cart = [{ price: 20, quantity: 1 }];
    const result = getShippingDetails(cart, "domestic");

    // Whole-object comparison instead of field-by-field
    expect(result).toEqual({ cost: 5, method: "standard" });
  });

  test("domestic orders over $50 qualify for free shipping", () => {
    const cart = [{ price: 100, quantity: 1 }];
    const result = getShippingDetails(cart, "domestic");

    expect(result).toEqual({ cost: 0, method: "free" });
  });

  test("domestic orders of exactly $50 qualify for free shipping", () => {
    const cart = [{ price: 50, quantity: 1 }];
    const result = getShippingDetails(cart, "domestic");

    expect(result).toEqual({ cost: 0, method: "free" }); // bug: currently returns { cost: 5, method: 'standard' }
  });
});

describe("getBulkDiscountRate", () => {
  test("fewer than 5 total items gets no discount", () => {
    const cart = [{ price: 5, quantity: 2 }];
    expect(getBulkDiscountRate(cart)).toBe(0);
  });

  test("5-9 total items across the cart gets a 5% rate", () => {
    const cart = [
      { price: 5, quantity: 1 },
      { price: 5, quantity: 6 },
    ];
    expect(getBulkDiscountRate(cart)).toBe(0.05); // bug: currently returns 0 (only reads cart[0])
  });

  test("10+ total items across the cart gets a 15% rate", () => {
    const cart = [
      { price: 5, quantity: 1 },
      { price: 5, quantity: 12 },
    ];
    // bug: currently returns 0 (only reads cart[0])
    // the >= 5 check also runs before >= 10, so this would still return 0.05 instead of 0.15
    expect(getBulkDiscountRate(cart)).toBe(0.15);
  });
});
