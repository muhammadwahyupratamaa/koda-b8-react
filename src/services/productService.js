import * as images from "../assets";
import { api } from "./api";

function getProductImage(imageKey) {
  if (imageKey === "headphoneWirelessPremium") {
    return images.productPlaceholder;
  }

  return images[imageKey] || images.productPlaceholder;
}
const productService = {
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
      image: getProductImage(product.image_url),
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
      image: getProductImage(product.image_url),
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
        image: getProductImage(product.image_url),
        imageKey: product.image_url,
        description: product.description,
      }))
      .slice(0, 4);
  },
};

export default productService;
