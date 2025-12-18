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

  // Search sweets (now supports price range)
  searchSweets: async (query, minPrice, maxPrice) => {
    try {
      let url = `/sweets/search`;
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (params.toString()) url += `?${params.toString()}`;
      const response = await axiosInstance.get(url);
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
  },

  // New: Update sweet (Admin only)
  updateSweet: async (id, sweetData) => {
    try {
      const response = await axiosInstance.put(`/sweets/${id}`, sweetData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to update sweet' };
    }
  },

  // New: Delete sweet (Admin only)
  deleteSweet: async (id) => {
    try {
      const response = await axiosInstance.delete(`/sweets/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to delete sweet' };
    }
  }
};