import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VideoRow from '../components/VideoRow';
import Loading from '../components/Loading';
import videoService from '../services/videoService';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [actionVideos, setActionVideos] = useState([]);
  const [comedyVideos, setComedyVideos] = useState([]);
  const [dramaVideos, setDramaVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      // Fetch all videos first
      const allVideosRes = await videoService.getVideos({ page: 1, limit: 20 });
      const allVideos = allVideosRes.data || [];

      if (allVideos.length === 0) {
        toast.info('No videos available yet. Please upload some videos from admin panel.');
        setLoading(false);
        return;
      }

      // Set featured video (first featured or first video)
      const featured = allVideos.find(v => v.isFeatured) || allVideos[0];
      setFeaturedVideo(featured);

      // Set trending videos
      const trending = allVideos.filter(v => v.isTrending);
      setTrendingVideos(trending.length > 0 ? trending : allVideos.slice(0, 5));

      // Set genre-based videos
      const action = allVideos.filter(v => v.genre && v.genre.includes('Action'));
      setActionVideos(action.length > 0 ? action : []);

      const comedy = allVideos.filter(v => v.genre && v.genre.includes('Comedy'));
      setComedyVideos(comedy.length > 0 ? comedy : []);

      const drama = allVideos.filter(v => v.genre && v.genre.includes('Drama'));
      setDramaVideos(drama.length > 0 ? drama : []);

    } catch (error) {
      console.error('Error fetching videos:', error);
      toast.error(error.response?.data?.message || 'Failed to load videos. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      {featuredVideo && (
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src={featuredVideo.posterUrl}
              alt={featuredVideo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
          </div>

          <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 slide-up">
                {featuredVideo.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6 line-clamp-3 slide-up">
                {featuredVideo.description}
              </p>
              <div className="flex items-center space-x-4 mb-6 slide-up">
                <span className="text-green-500 font-semibold text-xl">
                  {featuredVideo.rating}/10
                </span>
                <span className="text-gray-400">{featuredVideo.releaseYear}</span>
                <span className="text-gray-400">{featuredVideo.ageRating}</span>
                {featuredVideo.genre.slice(0, 3).map((g, i) => (
                  <span key={i} className="text-gray-400">
                    {g}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-4 slide-up">
                <button
                  onClick={() => navigate(`/watch/${featuredVideo._id}`)}
                  className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition font-semibold"
                >
                  <Play className="w-6 h-6" fill="currentColor" />
                  <span>Play Now</span>
                </button>
                <button
                  onClick={() => navigate(`/watch/${featuredVideo._id}`)}
                  className="flex items-center space-x-2 bg-gray-800 bg-opacity-80 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition font-semibold"
                >
                  <Info className="w-6 h-6" />
                  <span>More Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Rows */}
      <div className="relative z-20 -mt-32">
        <VideoRow title="Trending Now" videos={trendingVideos} />
        <VideoRow title="Action & Adventure" videos={actionVideos} />
        <VideoRow title="Comedy" videos={comedyVideos} />
        <VideoRow title="Drama" videos={dramaVideos} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
