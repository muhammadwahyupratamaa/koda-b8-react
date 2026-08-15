import { api } from "./api";

const categoryService = {
  async getCategories() {
    const result = await api("/categories");

    return result.data;
  },
};

export default categoryService;
