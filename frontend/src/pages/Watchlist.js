import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';
import { setWatchlist } from '../redux/slices/videoSlice';
import userService from '../services/userService';
import { toast } from 'react-toastify';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector((state) => state.video);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userService.getWatchlist();
      dispatch(setWatchlist(response.data));
    } catch (error) {
      toast.error('Failed to load watchlist');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">My Watchlist</h1>

        {loading ? (
          <Loading />
        ) : watchlist.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {watchlist.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">Your watchlist is empty</p>
            <p className="text-gray-500 mt-2">Add videos to your watchlist to watch them later</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Watchlist;
