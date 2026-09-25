// Solution for orderUtils.js, with all bugs fixed based on the requirements spec.

function calculateTotal(cart, discountAmount) {
  let total = 0;
  for (let item of cart) {
    total += item.price * item.quantity;
  }

  return Math.max(0, total - discountAmount);
}

function applyDiscountCode(price, code) {
  if (code.toUpperCase() === 'SAVE10') {
    return price * 0.9;
  } else if (code.toUpperCase() === 'SAVE20') {
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

  if (subtotal >= 50) {
    return { cost: 0, method: 'free' };
  }

  return { cost: 5, method: 'standard' };
}

function getBulkDiscountRate(cart) {
  let totalQuantity = 0;
  for (let item of cart) {
    totalQuantity += item.quantity;
  }

  if (totalQuantity >= 10) {
    return 0.15;
  } else if (totalQuantity >= 5) {
    return 0.05;
  }

  return 0;
}

export {
  calculateTotal,
  applyDiscountCode,
  getShippingDetails,
  getBulkDiscountRate,
};
