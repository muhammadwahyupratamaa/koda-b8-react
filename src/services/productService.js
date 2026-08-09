import products from "../data/product.json";
import * as images from "../assets";
import { api } from "./api";

const productService = {
  getProducts() {
    return products.map((product) => ({
      ...product,
      image: images[product.image],
      gallery: product.gallery.map((image) => images[image]),
    }));
  },

  async getProductsFromApi() {
    const result = await api("/products");

    return result.data.map((product) => ({
      id: Number(product.id),
      name: product.name,
      brand: product.brand,
      category: product.category,
      categoryId: Number(product.category_id),
      price: Number(product.price),
      priceDisc: Number(product.price_disc),
      discount: Number(product.discount),
      rating: Number(product.rating),
      review: Number(product.review),
      sold: Number(product.sold),
      stock: Number(product.stock),
      isFeatured: product.is_featured,
      image: images[product.image_url],
      imageKey: product.image_url,
      description: product.description,
    }));
  },

  async getProductDetailFromApi(id) {
    const result = await api(`/products/${id}`);
    const product = result.data;

    return {
      id: Number(product.id),
      name: product.name,
      brand: product.brand,
      category: product.category,
      categoryId: Number(product.category_id),
      price: Number(product.price),
      priceDisc: Number(product.price_disc),
      discount: Number(product.discount),
      rating: Number(product.rating),
      review: Number(product.review),
      sold: Number(product.sold),
      stock: Number(product.stock),
      isFeatured: product.is_featured,
      image: images[product.image_url],
      imageKey: product.image_url,
      gallery: images[product.image_url] ? [images[product.image_url]] : [],
      description: product.description,
      colors: [],
    };
  },

  async getRelatedProductsFromApi(categoryId, currentId) {
    const result = await api(`/products/category/${categoryId}`);

    return result.data
      .filter((product) => Number(product.id) !== Number(currentId))
      .map((product) => ({
        id: Number(product.id),
        name: product.name,
        brand: product.brand,
        category: product.category,
        categoryId: Number(product.category_id),
        price: Number(product.price),
        priceDisc: Number(product.price_disc),
        discount: Number(product.discount),
        rating: Number(product.rating),
        review: Number(product.review),
        sold: Number(product.sold),
        stock: Number(product.stock),
        isFeatured: product.is_featured,
        image: images[product.image_url],
        imageKey: product.image_url,
        description: product.description,
      }))
      .slice(0, 4);
  },

  getProductById(id) {
    return this.getProducts().find((product) => product.id === Number(id));
  },

  async getProductDetail(id) {
    const result = await api(`/products/${id}`);

    const staticProduct = this.getProductById(id);

    return {
      ...staticProduct,
      ...result.data,
      image: staticProduct?.image,
      gallery: staticProduct?.gallery || [],
    };
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

  getFilteredProducts({ keyword = "", category = "", promo = "" }) {
    let products = this.getProducts();

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

    if (category.trim()) {
      products = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (promo === "true") {
      products = products.filter((product) => product.discount >= 20);
    }

    return products;
  },
};

export default productService;
