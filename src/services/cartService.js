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

async function updateQuantity(productId, quantity) {
  return await api(`/cart/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
  });
}

async function removeProduct(productId) {
  return await api(`/cart/${productId}`, {
    method: "DELETE",
  });
}

export default {
  getCart,
  addToCart,
  updateQuantity,
  removeProduct,
};
