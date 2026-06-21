import axiosClient from './axiosClient';

export const adminApi = {
  getUsers: (params) => axiosClient.get('/api/v1/admin/users', { params }),
  getProducts: (params) => axiosClient.get('/api/v1/admin/products', { params }),
  updateProductStatus: (id, data) => axiosClient.put(`/api/v1/admin/products/${id}/status`, data),
  getOrders: (params) => axiosClient.get('/api/v1/admin/orders', { params }),
  
  getRevenueBar: (params) => axiosClient.get('/api/v1/seller/stats/revenue-bar', { params }),
  getRevenuePie: (params) => axiosClient.get('/api/v1/seller/stats/revenue-pie', { params }),
};