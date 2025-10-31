import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-8 h-8 text-red-600" />
              <span className="text-xl font-bold text-white">OTT Platform</span>
            </div>
            <p className="text-sm">
              Stream unlimited movies and shows. Watch anywhere. Cancel anytime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-white transition">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button className="hover:text-white transition text-left" onClick={() => {}}>
                  Help Center
                </button>
              </li>
              <li>
                <button className="hover:text-white transition text-left" onClick={() => {}}>
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="hover:text-white transition text-left" onClick={() => {}}>
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <button className="hover:text-white transition" onClick={() => {}} aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </button>
              <button className="hover:text-white transition" onClick={() => {}} aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </button>
              <button className="hover:text-white transition" onClick={() => {}} aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </button>
              <button className="hover:text-white transition" onClick={() => {}} aria-label="Youtube">
                <Youtube className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} OTT Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
