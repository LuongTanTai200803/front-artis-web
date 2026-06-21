import axiosClient from './axiosClient';

export const productApi = {
  getProducts: (params) => axiosClient.get('/api/v1/products', { params }),
  getById: (id) => axiosClient.get(`/api/v1/products/${id}`),
  getLatest: (params) => axiosClient.get('/api/v1/products/latest', { params }),
  getPopular: (params) => axiosClient.get('/api/v1/products/popular', { params }),
  addReview: (data) => axiosClient.post('/api/v1/reviews', data),
};