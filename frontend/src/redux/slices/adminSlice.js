import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dashboard: {
    stats: {},
    recentUsers: [],
    recentPayments: [],
    topVideos: [],
  },
  users: [],
  payments: [],
  analytics: {},
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setAnalytics: (state, action) => {
      state.analytics = action.payload;
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
  setDashboard,
  setUsers,
  setPayments,
  setAnalytics,
  setLoading,
  setError,
} = adminSlice.actions;

export default adminSlice.reducer;
