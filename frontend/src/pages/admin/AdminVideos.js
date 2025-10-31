import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import Loading from '../../components/Loading';
import videoService from '../../services/videoService';
import { toast } from 'react-toastify';
import { Plus, Trash2, Eye } from 'lucide-react';

const AdminVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await videoService.getVideos({ limit: 50 });
      setVideos(response.data);
    } catch (error) {
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await videoService.deleteVideo(id);
        toast.success('Video deleted');
        fetchVideos();
      } catch (error) {
        toast.error('Failed to delete video');
      }
    }
  };

  return (
    <div className="flex bg-black min-h-screen">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Videos Management</h1>
          <button
            onClick={() => navigate('/admin/upload-video')}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Upload Video</span>
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video._id} className="bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={video.posterUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2 truncate">{video.title}</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-gray-400 text-sm">{video.views} views</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-400 text-sm">{video.rating}/10</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {video.isPremium && (
                      <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold">
                        PREMIUM
                      </span>
                    )}
                    {video.isFeatured && (
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/watch/${video._id}`)}
                      className="flex-1 flex items-center justify-center space-x-1 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVideos;
