import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plans: [],
  currentSubscription: null,
  paymentHistory: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setPlans: (state, action) => {
      state.plans = action.payload;
    },
    setCurrentSubscription: (state, action) => {
      state.currentSubscription = action.payload;
    },
    setPaymentHistory: (state, action) => {
      state.paymentHistory = action.payload;
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
  setPlans,
  setCurrentSubscription,
  setPaymentHistory,
  setLoading,
  setError,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
