import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { setPlans, setCurrentSubscription } from '../redux/slices/subscriptionSlice';
import { updateUser } from '../redux/slices/authSlice';
import subscriptionService from '../services/subscriptionService';
import { toast } from 'react-toastify';
import { Check } from 'lucide-react';

const Subscription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { plans } = useSelector((state) => state.subscription);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await subscriptionService.getPlans();
      dispatch(setPlans(response.data));
    } catch (error) {
      toast.error('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    if (!isAuthenticated) {
      toast.error('Please login to subscribe');
      navigate('/login');
      return;
    }

    setSubscribing(planId);

    try {
      const response = await subscriptionService.subscribe(planId);
      dispatch(setCurrentSubscription(response.data.subscription));
      dispatch(updateUser({ subscription: response.data.subscription }));
      toast.success('Subscription successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Subscription failed');
    } finally {
      setSubscribing(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 text-xl">
            Watch unlimited movies and shows. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`bg-gray-900 rounded-lg p-8 ${
                plan.name === 'Premium' ? 'ring-2 ring-red-600 transform scale-105' : ''
              }`}
            >
              {plan.name === 'Premium' && (
                <div className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  POPULAR
                </div>
              )}
              
              <h2 className="text-3xl font-bold text-white mb-2">{plan.name}</h2>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">
                  ${plan.price}
                </span>
                <span className="text-gray-400">
                  /{plan.duration === 365 ? 'year' : 'month'}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{plan.videoQuality} Quality</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {plan.simultaneousScreens} Screen{plan.simultaneousScreens > 1 ? 's' : ''}
                  </span>
                </li>
              </ul>

              <button
                onClick={() => handleSubscribe(plan._id)}
                disabled={subscribing === plan._id}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.name === 'Premium'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                } disabled:opacity-50`}
              >
                {subscribing === plan._id ? 'Processing...' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p className="mb-2">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span>✓ Cancel anytime</span>
            <span>✓ Watch on any device</span>
            <span>✓ New releases every week</span>
            <span>✓ Offline viewing</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Subscription;
