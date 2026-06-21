import axiosClient from './axiosClient';

export const categoryApi = {
  list: () => axiosClient.get('/categories'),
};
