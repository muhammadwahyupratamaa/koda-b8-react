import { api } from "./api";

async function getWishlist() {
  return await api("/wishlist");
}

async function addToWishlist(productId) {
  return await api("/wishlist", {
    method: "POST",
    body: JSON.stringify({
      productId,
    }),
  });
}

async function removeFromWishlist(productId) {
  return await api(`/wishlist/${productId}`, {
    method: "DELETE",
  });
}

export default {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
