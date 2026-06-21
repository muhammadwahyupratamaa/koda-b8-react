function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += product.qty;
  } else {
    cart.push(product);
  }

  saveCart(cart);
}

export default {
  getCart,
  saveCart,
  addToCart,
};
