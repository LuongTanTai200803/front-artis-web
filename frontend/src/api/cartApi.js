import axiosClient from './axiosClient';

export const cartApi = {
  getCart: () => axiosClient.get('/api/v1/cart'),
  addItem: (data) => axiosClient.post('/api/v1/cart/items', data),
  updateItemQuantity: (id, data) => axiosClient.put(`/api/v1/cart/items/${id}`, data),
  removeItem: (cartItemId) => axiosClient.delete(`/api/v1/cart/items/${cartItemId}`),
};