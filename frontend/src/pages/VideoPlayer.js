import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentVideo, setRecommendedVideos, addToWatchlist, removeFromWatchlist } from '../redux/slices/videoSlice';
import videoService from '../services/videoService';
import userService from '../services/userService';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const { currentVideo, recommendedVideos, watchlist } = useSelector((state) => state.video);
  const [loading, setLoading] = useState(true);

  const isInWatchlist = watchlist.some((v) => v._id === id);

  useEffect(() => {
    fetchVideoData();
  }, [id]);

  useEffect(() => {
    // Update watch progress every 10 seconds
    const interval = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        userService.updateWatchProgress(id, progress).catch(console.error);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);

  const fetchVideoData = async () => {
    try {
      setLoading(true);

      // Fetch video details
      const videoRes = await videoService.getVideoById(id);
      dispatch(setCurrentVideo(videoRes.data));

      // Fetch recommended videos
      const recommendedRes = await videoService.getRecommendedVideos(id);
      dispatch(setRecommendedVideos(recommendedRes.data));

    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('Premium subscription required');
        navigate('/subscription');
      } else {
        toast.error('Failed to load video');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlist = async () => {
    try {
      if (isInWatchlist) {
        await userService.removeFromWatchlist(id);
        dispatch(removeFromWatchlist(id));
        toast.success('Removed from watchlist');
      } else {
        await userService.addToWatchlist(id);
        dispatch(addToWatchlist(currentVideo));
        toast.success('Added to watchlist');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update watchlist');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!currentVideo) {
    return null;
  }

  const streamUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/videos/stream/${id}`;

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Video Player */}
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full"
          controls
          autoPlay
          src={streamUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-4">{currentVideo.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-green-500 font-semibold text-xl">
                {currentVideo.rating}/10
              </span>
              <span className="text-gray-400">{currentVideo.releaseYear}</span>
              <span className="text-gray-400">{currentVideo.ageRating}</span>
              <span className="text-gray-400">{Math.floor(currentVideo.duration / 60)}m</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentVideo.genre.map((g, i) => (
                <span
                  key={i}
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-lg mb-6 max-w-3xl">
              {currentVideo.description}
            </p>

            {currentVideo.cast && currentVideo.cast.length > 0 && (
              <div className="mb-4">
                <h3 className="text-white font-semibold mb-2">Cast:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentVideo.cast.map((actor, i) => (
                    <span key={i} className="text-gray-400">
                      {actor.name}
                      {i < currentVideo.cast.length - 1 && ','}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentVideo.director && (
              <div className="mb-4">
                <h3 className="text-white font-semibold">
                  Director: <span className="text-gray-400 font-normal">{currentVideo.director}</span>
                </h3>
              </div>
            )}
          </div>

          <button
            onClick={handleWatchlist}
            className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition flex items-center space-x-2"
          >
            {isInWatchlist ? (
              <>
                <Check className="w-5 h-5" />
                <span>In Watchlist</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add to Watchlist</span>
              </>
            )}
          </button>
        </div>

        {/* Recommended Videos */}
        {recommendedVideos.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">More Like This</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedVideos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
