function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
}
function isInWishlist(id) {
  return getWishlist().some((item) => item.id === id);
}

function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function addToWishlist(product) {
  const wishlist = getWishlist();

  const existing = wishlist.find((item) => item.id === product.id);

  if (existing) return;

  wishlist.push(product);

  saveWishlist(wishlist);
}

function removeFromWishlist(id) {
  const wishlist = getWishlist().filter((item) => item.id !== id);

  saveWishlist(wishlist);
}

export default {
  getWishlist,
  saveWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
};
