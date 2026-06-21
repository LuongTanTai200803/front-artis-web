import axiosClient from './axiosClient';

export const authApi = {
  register: (data) => axiosClient.post('/api/v1/auth/register', data),
  verifyEmail: (data) => axiosClient.post('/api/v1/auth/verify-email', data),
  login: (data) => axiosClient.post('/api/v1/auth/login', data),
  logout: () => axiosClient.post('/api/v1/auth/logout'),
  forgotPassword: (data) => axiosClient.post('/api/v1/auth/forgot-password', data),
  updateProfile: (data) => axiosClient.put('/api/v1/users/profile', data),
};