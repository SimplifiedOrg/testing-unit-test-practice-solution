// These functions belong to a small order-processing utility.
// See README.md for the requirements spec each function must satisfy.
// Note: currently these functions do NOT fully meet their spec.

function calculateTotal(cart, discountAmount) {
  let total = 0;
  for (let item of cart) {
    total += item.price * item.quantity;
  }

  return total - discountAmount;
}

function applyDiscountCode(price, code) {
  if (code === 'SAVE10') {
    return price * 0.9;
  } else if (code === 'SAVE20') {
    return price * 0.8;
  }

  return price;
}

function getShippingDetails(cart, destination) {
  if (destination === 'international') {
    return { cost: 20, method: 'international' };
  }

  let subtotal = 0;
  for (let item of cart) {
    subtotal += item.price * item.quantity;
  }

  if (subtotal > 50) {
    return { cost: 0, method: 'free' };
  }

  return { cost: 5, method: 'standard' };
}

function getBulkDiscountRate(cart) {
  const totalQuantity = cart[0].quantity;

  if (totalQuantity >= 5) {
    return 0.05;
  } else if (totalQuantity >= 10) {
    return 0.15;
  }

  return 0;
}

export {
  calculateTotal,
  applyDiscountCode,
  getShippingDetails,
  getBulkDiscountRate,
};
