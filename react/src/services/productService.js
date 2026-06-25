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
    return this.getProducts().filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase(),
    );
  },
  getRelatedProducts(category, currentId) {
    return this.getProducts()
      .filter(
        (product) =>
          product.category.toLowerCase() ===
            category.toLowerCase() && product.id !== currentId,
      )
      .slice(0, 4);
  },

  searchProducts(keyword) {
    const search = keyword.trim().toLowerCase();

    return this.getProducts().filter((product) => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
      );
    });
  },
};

export default productService;
