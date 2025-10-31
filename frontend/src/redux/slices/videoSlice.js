import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  currentVideo: null,
  recommendedVideos: [],
  watchlist: [],
  loading: false,
  error: null,
  filters: {
    genre: '',
    search: '',
    featured: false,
    trending: false,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
  },
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
    setRecommendedVideos: (state, action) => {
      state.recommendedVideos = action.payload;
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(video => video._id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setVideos,
  setCurrentVideo,
  setRecommendedVideos,
  setWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  setFilters,
  setPagination,
  setLoading,
  setError,
} = videoSlice.actions;

export default videoSlice.reducer;
