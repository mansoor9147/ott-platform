import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Loading from '../../components/Loading';
import subscriptionService from '../../services/subscriptionService';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Check } from 'lucide-react';

const AdminSubscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: 30,
    features: '',
    videoQuality: 'HD',
    simultaneousScreens: 1,
    downloadAllowed: false,
    adsEnabled: false,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await subscriptionService.getPlans();
      setPlans(response.data);
    } catch (error) {
      toast.error('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        ...formData,
        features: formData.features.split('\n').filter(f => f.trim()),
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        simultaneousScreens: parseInt(formData.simultaneousScreens),
      };

      if (editingPlan) {
        // Update logic would go here
        toast.info('Update functionality not implemented in this demo');
      } else {
        // Create logic would go here
        toast.info('Create functionality not implemented in this demo');
      }

      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: 30,
      features: '',
      videoQuality: 'HD',
      simultaneousScreens: 1,
      downloadAllowed: false,
      adsEnabled: false,
    });
    setEditingPlan(null);
  };

  return (
    <div className="flex bg-black min-h-screen">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Subscription Plans</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add Plan</span>
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={`bg-gray-900 rounded-lg p-6 ${
                  plan.name === 'Premium' ? 'ring-2 ring-red-600' : ''
                }`}
              >
                <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                <p className="text-gray-400 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">
                    /{plan.duration === 365 ? 'year' : 'month'}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 text-sm text-gray-400 mb-6">
                  <p>Quality: {plan.videoQuality}</p>
                  <p>Screens: {plan.simultaneousScreens}</p>
                  <p>Downloads: {plan.downloadAllowed ? 'Yes' : 'No'}</p>
                  <p>Ads: {plan.adsEnabled ? 'Yes' : 'No'}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingPlan(plan);
                      setFormData({
                        ...plan,
                        features: plan.features.join('\n'),
                      });
                      setShowModal(true);
                    }}
                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                  >
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingPlan ? 'Edit Plan' : 'Create New Plan'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Plan Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2">Duration (days)</label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Features (one per line)</label>
                    <textarea
                      name="features"
                      value={formData.features}
                      onChange={handleChange}
                      rows="5"
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Video Quality</label>
                      <select
                        name="videoQuality"
                        value={formData.videoQuality}
                        onChange={handleChange}
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="SD">SD</option>
                        <option value="HD">HD</option>
                        <option value="FHD">Full HD</option>
                        <option value="4K">4K</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2">Simultaneous Screens</label>
                      <input
                        type="number"
                        name="simultaneousScreens"
                        value={formData.simultaneousScreens}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        name="downloadAllowed"
                        checked={formData.downloadAllowed}
                        onChange={handleChange}
                        className="w-5 h-5 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600"
                      />
                      <span>Allow Downloads</span>
                    </label>

                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        name="adsEnabled"
                        checked={formData.adsEnabled}
                        onChange={handleChange}
                        className="w-5 h-5 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600"
                      />
                      <span>Show Ads</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    {editingPlan ? 'Update Plan' : 'Create Plan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-6 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubscriptions;
