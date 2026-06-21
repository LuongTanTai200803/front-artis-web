import axiosClient from './axiosClient';

export const orderApi = {
  createOrder: (data) => axiosClient.post('/api/v1/orders', data),
  payOrder: (id) => axiosClient.post(`/api/v1/orders/${id}/pay`),
  cancelOrder: (id) => axiosClient.put(`/api/v1/orders/${id}/cancel`),
  updateStatus: (id, data) => axiosClient.put(`/api/v1/orders/${id}/status`, data),
  getHistory: (params) => axiosClient.get('/api/v1/orders/history', { params }),
};