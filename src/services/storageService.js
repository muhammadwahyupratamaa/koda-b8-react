const storageService = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);

      if (data === null) {
        return defaultValue;
      }

      return JSON.parse(data);
    } catch (error) {
      console.error(`Failed to read "${key}" from localStorage`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save "${key}" to localStorage`, error);
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

export default storageService;
