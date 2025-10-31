import api from './api';

const subscriptionService = {
  getPlans: async () => {
    const response = await api.get('/subscriptions/plans');
    return response.data;
  },

  subscribe: async (planId, paymentMethod = 'mock') => {
    const response = await api.post('/subscriptions/subscribe', {
      planId,
      paymentMethod,
    });
    return response.data;
  },

  getMySubscription: async () => {
    const response = await api.get('/subscriptions/my-subscription');
    return response.data;
  },

  cancelSubscription: async () => {
    const response = await api.post('/subscriptions/cancel');
    return response.data;
  },

  getPaymentHistory: async () => {
    const response = await api.get('/subscriptions/payments');
    return response.data;
  },
};

export default subscriptionService;
