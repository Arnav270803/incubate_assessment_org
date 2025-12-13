import axiosInstance from './axios';

export const sweetApi = {
  // Get all sweets
  getAllSweets: async () => {
    try {
      const response = await axiosInstance.get('/sweets');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch sweets' };
    }
  },

  // Search sweets
  searchSweets: async (query) => {
    try {
      const response = await axiosInstance.get(`/sweets/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Search failed' };
    }
  },

  // Add sweet (Admin only)
  addSweet: async (sweetData) => {
    try {
      const response = await axiosInstance.post('/sweets', sweetData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to add sweet' };
    }
  },

  // Purchase sweet
  purchaseSweet: async (id, quantity) => {
    try {
      const response = await axiosInstance.post(`/sweets/${id}/purchase`, { quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Purchase failed' };
    }
  },

  // Restock sweet (Admin only)
  restockSweet: async (id, quantity) => {
    try {
      const response = await axiosInstance.post(`/sweets/${id}/restock`, { quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Restock failed' };
    }
  }
};