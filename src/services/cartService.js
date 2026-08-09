import { api } from "./api";

async function getCart() {
  return await api("/cart");
}

async function addToCart(productId, color) {
  return await api("/cart", {
    method: "POST",
    body: JSON.stringify({
      productId,
      color,
    }),
  });
}

async function updateQuantity(cartItemId, quantity) {
  return await api(`/cart/${cartItemId}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
  });
}

async function removeProduct(cartItemId) {
  return await api(`/cart/${cartItemId}`, {
    method: "DELETE",
  });
}

export default {
  getCart,
  addToCart,
  updateQuantity,
  removeProduct,
};
