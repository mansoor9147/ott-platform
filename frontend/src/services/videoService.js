import api from './api';

const videoService = {
  getVideos: async (params = {}) => {
    const response = await api.get('/videos', { params });
    return response.data;
  },

  getVideoById: async (id) => {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },

  getRecommendedVideos: async (id) => {
    const response = await api.get(`/videos/${id}/recommended`);
    return response.data;
  },

  uploadVideo: async (formData) => {
    const response = await api.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateVideo: async (id, formData) => {
    const response = await api.put(`/videos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteVideo: async (id) => {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
  },

  getStreamUrl: (id) => {
    const token = localStorage.getItem('accessToken');
    return `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/videos/stream/${id}?token=${token}`;
  },
};

export default videoService;
