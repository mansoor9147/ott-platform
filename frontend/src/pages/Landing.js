import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Play, Star, TrendingUp, Users, Shield } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80"
            alt="Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 hero-gradient-bottom"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-2">
            <Film className="w-10 h-10 text-red-600" />
            <span className="text-3xl font-bold">OTT Platform</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Sign In
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 slide-up">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 slide-up">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="text-xl text-gray-400 mb-8 slide-up">
              Ready to watch? Sign in to access thousands of movies and shows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up">
              <button
                onClick={() => navigate('/register')}
                className="btn-premium bg-red-600 text-white px-12 py-4 rounded-lg hover:bg-red-700 transition font-bold text-lg flex items-center space-x-2"
              >
                <Play className="w-6 h-6" fill="currentColor" />
                <span>Get Started</span>
              </button>
              <button
                onClick={() => navigate('/login')}
                className="glass text-white px-12 py-4 rounded-lg hover:bg-white/20 transition font-bold text-lg"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            Why Choose Our Platform?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass p-8 rounded-xl text-center scale-in">
              <div className="flex justify-center mb-4">
                <div className="bg-red-600 p-4 rounded-full">
                  <Star className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Content</h3>
              <p className="text-gray-400">
                Access to thousands of movies and TV shows in HD and 4K quality
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass p-8 rounded-xl text-center scale-in">
              <div className="flex justify-center mb-4">
                <div className="bg-red-600 p-4 rounded-full">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Trending Now</h3>
              <p className="text-gray-400">
                Stay updated with the latest releases and trending content
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass p-8 rounded-xl text-center scale-in">
              <div className="flex justify-center mb-4">
                <div className="bg-red-600 p-4 rounded-full">
                  <Users className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Multiple Profiles</h3>
              <p className="text-gray-400">
                Create profiles for different family members with personalized recommendations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-8">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Flexible plans to suit your needs. Cancel anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="glass p-8 rounded-xl">
              <h3 className="text-3xl font-bold mb-4">Free</h3>
              <p className="text-5xl font-bold mb-6">$0<span className="text-xl text-gray-400">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>Limited content library</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>SD quality</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>1 screen</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
              >
                Get Started
              </button>
            </div>

            {/* Standard Plan */}
            <div className="glass p-8 rounded-xl ring-2 ring-red-600 transform scale-105">
              <div className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                POPULAR
              </div>
              <h3 className="text-3xl font-bold mb-4">Standard</h3>
              <p className="text-5xl font-bold mb-6">$9.99<span className="text-xl text-gray-400">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>Full content library</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>HD quality</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>2 screens</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>Download available</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className="glass p-8 rounded-xl">
              <h3 className="text-3xl font-bold mb-4">Premium</h3>
              <p className="text-5xl font-bold mb-6">$14.99<span className="text-xl text-gray-400">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>Full content library</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>4K Ultra HD quality</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>4 screens</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>Download available</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span>Early access</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">
            Ready to start watching?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Sign in now and start streaming your favorite content
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="btn-premium bg-red-600 text-white px-12 py-4 rounded-lg hover:bg-red-700 transition font-bold text-lg"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate('/login')}
              className="glass text-white px-12 py-4 rounded-lg hover:bg-white/20 transition font-bold text-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} OTT Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
