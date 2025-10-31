import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import videoService from '../../services/videoService';
import { toast } from 'react-toastify';
import { Upload, Film, Image } from 'lucide-react';

const AdminUploadVideo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    genre: [],
    director: '',
    releaseYear: new Date().getFullYear(),
    rating: '',
    ageRating: 'U',
    language: 'English',
    isPremium: false,
    isFeatured: false,
    isTrending: false,
  });
  const [files, setFiles] = useState({
    video: null,
    poster: null,
    thumbnail: null,
  });
  const [uploading, setUploading] = useState(false);

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Documentary', 'Animation', 'Fantasy', 'Crime', 'Adventure'];
  const ageRatings = ['U', 'U/A 7+', 'U/A 13+', 'U/A 16+', 'A'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenreToggle = (genre) => {
    setFormData({
      ...formData,
      genre: formData.genre.includes(genre)
        ? formData.genre.filter((g) => g !== genre)
        : [...formData.genre, genre],
    });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.video || !files.poster) {
      toast.error('Please upload video and poster');
      return;
    }

    setUploading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'genre') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

      data.append('video', files.video);
      data.append('poster', files.poster);
      if (files.thumbnail) {
        data.append('thumbnail', files.thumbnail);
      }

      await videoService.uploadVideo(data);
      toast.success('Video uploaded successfully!');
      navigate('/admin/videos');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex bg-black min-h-screen">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Upload Video</h1>

        <form onSubmit={handleSubmit} className="max-w-4xl bg-gray-900 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-gray-400 mb-2">Duration (seconds) *</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            {/* Release Year */}
            <div>
              <label className="block text-gray-400 mb-2">Release Year</label>
              <input
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Director */}
            <div>
              <label className="block text-gray-400 mb-2">Director</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-400 mb-2">Rating (0-10)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Age Rating */}
            <div>
              <label className="block text-gray-400 mb-2">Age Rating</label>
              <select
                name="ageRating"
                value={formData.ageRating}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {ageRatings.map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-gray-400 mb-2">Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {/* Genre */}
          <div className="mt-6">
            <label className="block text-gray-400 mb-2">Genres</label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-4 py-2 rounded-lg transition ${
                    formData.genre.includes(genre)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* File Uploads */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Video File *</label>
              <div className="relative">
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-upload"
                  required
                />
                <label
                  htmlFor="video-upload"
                  className="flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                >
                  <Film className="w-5 h-5" />
                  <span>{files.video ? files.video.name : 'Choose Video'}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Poster Image *</label>
              <div className="relative">
                <input
                  type="file"
                  name="poster"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="poster-upload"
                  required
                />
                <label
                  htmlFor="poster-upload"
                  className="flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                >
                  <Image className="w-5 h-5" />
                  <span>{files.poster ? files.poster.name : 'Choose Poster'}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Thumbnail (Optional)</label>
              <div className="relative">
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                >
                  <Image className="w-5 h-5" />
                  <span>{files.thumbnail ? files.thumbnail.name : 'Choose Thumbnail'}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mt-6 space-y-3">
            <label className="flex items-center space-x-3 text-white cursor-pointer">
              <input
                type="checkbox"
                name="isPremium"
                checked={formData.isPremium}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600"
              />
              <span>Premium Content</span>
            </label>

            <label className="flex items-center space-x-3 text-white cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600"
              />
              <span>Featured</span>
            </label>

            <label className="flex items-center space-x-3 text-white cursor-pointer">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600"
              />
              <span>Trending</span>
            </label>
          </div>

          {/* Submit */}
          <div className="mt-8 flex space-x-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>{uploading ? 'Uploading...' : 'Upload Video'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/videos')}
              className="px-6 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUploadVideo;
