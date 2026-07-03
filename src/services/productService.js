import products from "../data/product.json";
import * as images from "../assets";

const productService = {
  getProducts() {
    return products.map((product) => ({
      ...product,
      image: images[product.image],
      gallery: product.gallery.map((image) => images[image]),
    }));
  },

  getProductById(id) {
    return this.getProducts().find((product) => product.id === Number(id));
  },

  getProductsByCategory(category) {
    return this.getFilteredProducts({ category });
  },

  getRelatedProducts(category, currentId) {
    return this.getProducts()
      .filter(
        (product) =>
          product.category.toLowerCase() === category.toLowerCase() &&
          product.id !== currentId,
      )
      .slice(0, 4);
  },

  getFlashDeals() {
    return this.getProducts()
      .filter((product) => product.discount >= 30)
      .slice(0, 8);
  },

  getFeaturedProduct() {
    return this.getProducts()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  },

  getNewestProducts() {
    return this.getProducts().slice(0, 8);
  },

  searchProducts(keyword) {
    return this.getFilteredProducts({ keyword });
  },

  getFilteredProducts({
    keyword = "",
    category = "",
    promo = "",
  }) {
    let products = this.getProducts();

    // Search
    if (keyword.trim()) {
      const search = keyword.trim().toLowerCase();

      products = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(search) ||
          product.brand.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
        );
      });
    }

    // Category
    if (category.trim()) {
      products = products.filter(
        (product) =>
          product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // Promo
    if (promo === "true") {
      products = products.filter(
        (product) => product.discount >= 20,
      );
    }

    return products;
  },
};

export default productService;