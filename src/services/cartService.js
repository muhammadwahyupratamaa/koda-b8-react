function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product, qty = 1, color = "") {
  const cart = getCart();

  const existing = cart.find(
    (item) => item.id === product.id && item.color === color,
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      priceDisc: product.priceDisc,
      stock: product.stock,
      qty,
      color,
    });
  }

  saveCart(cart);
}

function increaseQty(id) {
  const cart = getCart();

  const item = cart.find((item) => item.id === id);

  if (item) {
    item.qty += 1;
  }

  saveCart(cart);
}

function decreaseQty(id) {
  let cart = getCart();

  const item = cart.find((item) => item.id === id);

  if (!item) return;

  if (item.qty > 1) {
    item.qty -= 1;
  } else {
    cart = cart.filter((item) => item.id !== id);
  }

  saveCart(cart);
}

function removeItem(id) {
  const cart = getCart().filter((item) => item.id !== id);

  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem("cart");
}

// Orders

function getOrders() {
  return JSON.parse(localStorage.getItem("orders") || "[]");
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function checkout() {
  const cart = getCart();

  if (cart.length === 0) return null;

  const shipping = JSON.parse(localStorage.getItem("shipping"));
  const payment = localStorage.getItem("payment");

  const orders = getOrders();

  const order = {
    id: Date.now(),
    orderNumber: `BM${Date.now()}`,
    items: cart,
    shipping,
    payment,
    total: cart.reduce((total, item) => total + item.price * item.qty, 0),
    createdAt: new Date().toISOString(),
    status: "Diproses",
  };

  orders.unshift(order);

  saveOrders(orders);

  clearCart();
  localStorage.removeItem("shipping");
  localStorage.removeItem("payment");

  return order;
}

export default {
  getCart,
  saveCart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
  getOrders,
  saveOrders,
  checkout,
};
