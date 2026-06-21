import axiosClient from './axiosClient';

export const sellerApi = {
  getProducts: (params) => axiosClient.get('/api/v1/seller/products', { params }),
  createProduct: (data) => axiosClient.post('/api/v1/seller/products', data),
  getOrders: (params) => axiosClient.get('/api/v1/seller/orders', { params }),
  getRevenueBar: (params) => axiosClient.get('/api/v1/seller/stats/revenue-bar', { params }),
  getRevenuePie: (params) => axiosClient.get('/api/v1/seller/stats/revenue-pie', { params }),
};