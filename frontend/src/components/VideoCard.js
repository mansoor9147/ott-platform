import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Check, Clock, Star, TrendingUp } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/slices/videoSlice';
import userService from '../services/userService';
import { toast } from 'react-toastify';

const VideoCard = ({ video, size = 'medium' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.video);
  const [isHovered, setIsHovered] = useState(false);

  const isInWatchlist = watchlist.some((v) => v._id === video._id);

  const handlePlay = () => {
    navigate(`/watch/${video._id}`);
  };

  const handleWatchlist = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add to watchlist');
      navigate('/login');
      return;
    }

    try {
      if (isInWatchlist) {
        await userService.removeFromWatchlist(video._id);
        dispatch(removeFromWatchlist(video._id));
        toast.success('Removed from watchlist');
      } else {
        await userService.addToWatchlist(video._id);
        dispatch(addToWatchlist(video));
        toast.success('Added to watchlist');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update watchlist');
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const sizeClasses = {
    small: 'w-48',
    medium: 'w-64',
    large: 'w-80'
  };

  return (
    <div 
      className={`video-card group relative overflow-hidden rounded-xl cursor-pointer ${sizeClasses[size]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
        <img
          src={video.posterUrl || 'https://via.placeholder.com/400x225'}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Info Overlay - Always visible on hover */}
        <div className="video-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            {/* Title */}
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
            
            {/* Meta Info */}
            <div className="flex items-center flex-wrap gap-2 mb-3">
              <div className="flex items-center space-x-1 bg-green-600 px-2 py-1 rounded">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-white text-xs font-bold">{video.rating}</span>
              </div>
              <span className="text-gray-300 text-xs">{video.releaseYear}</span>
              <span className="text-gray-300 text-xs flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatDuration(video.duration)}
              </span>
              {video.isPremium && (
                <span className="premium-badge text-black text-xs px-2 py-1 rounded font-bold">
                  PREMIUM
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1 mb-3">
              {video.genre.slice(0, 3).map((g, i) => (
                <span key={i} className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded">
                  {g}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay();
                }}
                className="btn-premium flex-1 flex items-center justify-center space-x-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                <Play className="w-4 h-4" fill="currentColor" />
                <span>Play</span>
              </button>
              
              <button
                onClick={handleWatchlist}
                className="glass text-white p-2 rounded-lg hover:bg-white/20 transition"
              >
                {isInWatchlist ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            {video.isFeatured && (
              <div className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold shadow-lg">
                FEATURED
              </div>
            )}
            {video.isTrending && (
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs px-2 py-1 rounded font-bold shadow-lg flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                TRENDING
              </div>
            )}
          </div>
          
          {/* Quality Badge */}
          <div className="quality-badge text-white text-xs px-2 py-1 rounded font-bold">
            HD
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
