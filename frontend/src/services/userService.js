import api from './api';

const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (formData) => {
    const response = await api.put('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getWatchlist: async () => {
    const response = await api.get('/users/watchlist');
    return response.data;
  },

  addToWatchlist: async (videoId) => {
    const response = await api.post(`/users/watchlist/${videoId}`);
    return response.data;
  },

  removeFromWatchlist: async (videoId) => {
    const response = await api.delete(`/users/watchlist/${videoId}`);
    return response.data;
  },

  getWatchHistory: async () => {
    const response = await api.get('/users/history');
    return response.data;
  },

  updateWatchProgress: async (videoId, progress) => {
    const response = await api.post(`/users/watch-progress/${videoId}`, { progress });
    return response.data;
  },
};

export default userService;
