import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { Search, User, LogOut, Film, Heart, CreditCard, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-white">OTT Platform</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-white hover:text-red-500 transition">
              Home
            </Link>
            <Link to="/browse" className="text-white hover:text-red-500 transition">
              Browse
            </Link>
            {isAuthenticated && (
              <Link to="/watchlist" className="text-white hover:text-red-500 transition">
                My List
              </Link>
            )}
          </div>

          {/* Search and User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity">
                  <img
                    src={user?.profilePicture || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full ring-2 ring-red-600 ring-offset-2 ring-offset-black"
                  />
                </button>
                <div className="absolute right-0 mt-3 w-56 glass backdrop-blur-xl bg-black/90 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 overflow-hidden">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-red-600/20 to-transparent">
                    <p className="text-white font-semibold text-sm">{user?.name || 'User'}</p>
                    <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center group-hover/item:bg-red-600/30 transition-colors">
                        <User className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-white font-medium">Profile</span>
                    </Link>
                    <Link
                      to="/watchlist"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-600/20 flex items-center justify-center group-hover/item:bg-pink-600/30 transition-colors">
                        <Heart className="w-4 h-4 text-pink-500" />
                      </div>
                      <span className="text-white font-medium">Watchlist</span>
                    </Link>
                    <Link
                      to="/subscription"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-yellow-600/20 flex items-center justify-center group-hover/item:bg-yellow-600/30 transition-colors">
                        <CreditCard className="w-4 h-4 text-yellow-500" />
                      </div>
                      <span className="text-white font-medium">Subscription</span>
                    </Link>
                  </div>
                  
                  {/* Logout Button */}
                  <div className="border-t border-white/10 p-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-red-600/20 transition-colors rounded-lg w-full text-left group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center group-hover/item:bg-red-600/30 transition-colors">
                        <LogOut className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-white font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-red-500 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </form>
            <Link
              to="/home"
              className="block text-white hover:text-red-500 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="block text-white hover:text-red-500 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/watchlist"
                  className="block text-white hover:text-red-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My List
                </Link>
                <Link
                  to="/profile"
                  className="block text-white hover:text-red-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/subscription"
                  className="block text-white hover:text-red-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Subscription
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block text-white hover:text-red-500 py-2 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:text-red-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
