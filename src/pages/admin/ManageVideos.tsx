import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Pencil, Plus, Trash, Video } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/AdminSidebar';
import { useServices } from '../../context/ServicesContext';

const ManageVideos = () => {
  const { videos, addVideo, updateVideo, deleteVideo } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{ id: string; title: string; youtubeId: string; description: string } | null>(null);
  const [videoToDelete, setVideoToDelete] = useState<{ id: string; title: string } | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [description, setDescription] = useState('');

  const openAddModal = () => {
    setCurrentVideo(null);
    setTitle('');
    setYoutubeId('');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (video: { id: string; title: string; youtubeId: string; description: string }) => {
    setCurrentVideo(video);
    setTitle(video.title);
    setYoutubeId(video.youtubeId);
    setDescription(video.description);
    setIsModalOpen(true);
  };

  const openDeleteModal = (video: { id: string; title: string }) => {
    setVideoToDelete(video);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !youtubeId || !description) {
      toast.error('All fields are required');
      return;
    }
    
    // Extract YouTube ID from full URL if needed
    let processedYoutubeId = youtubeId;
    if (youtubeId.includes('youtube.com') || youtubeId.includes('youtu.be')) {
      try {
        const url = new URL(youtubeId);
        if (youtubeId.includes('youtube.com/watch')) {
          processedYoutubeId = url.searchParams.get('v') || youtubeId;
        } else if (youtubeId.includes('youtu.be/')) {
          processedYoutubeId = url.pathname.slice(1) || youtubeId;
        }
      } catch (e) {
        // If URL parsing fails, keep the original value
      }
    }
    
    const videoData = {
      title,
      youtubeId: processedYoutubeId,
      description,
    };
    
    if (currentVideo) {
      // Update existing video
      updateVideo(currentVideo.id, videoData);
      toast.success('Video updated successfully');
    } else {
      // Add new video
      addVideo(videoData);
      toast.success('Video added successfully');
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (videoToDelete) {
      deleteVideo(videoToDelete.id);
      toast.success('Video deleted successfully');
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gray-800"
            >
              Manage Videos
            </motion.h1>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Add Video
            </motion.button>
          </div>
          
          {/* Videos Grid */}
          {videos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-8 text-center"
            >
              <Film size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos added yet</h3>
              <p className="text-gray-500 mb-6">
                Start showcasing your work by adding YouTube videos.
              </p>
              <button
                onClick={openAddModal}
                className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                <Plus size={18} className="mr-1" />
                Add First Video
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-48"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{video.title}</h3>
                        <p className="text-gray-600 text-sm">{video.description}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => openEditModal(video)}
                          className="text-indigo-600 hover:text-indigo-800"
                          title="Edit Video"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteModal({ id: video.id, title: video.title })}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Video"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Video size={14} className="mr-1" />
                        <span>YouTube ID: {video.youtubeId}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {currentVideo ? 'Edit Video' : 'Add New Video'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="title">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Video title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="youtubeId">
                        YouTube Video ID or URL
                      </label>
                      <input
                        type="text"
                        id="youtubeId"
                        value={youtubeId}
                        onChange={(e) => setYoutubeId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="dQw4w9WgXcQ or https://youtu.be/dQw4w9WgXcQ"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Enter the YouTube video ID or the full URL of the video
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Brief description of the video"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      {currentVideo ? 'Update Video' : 'Add Video'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete the video <span className="font-medium">{videoToDelete?.title}</span>? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageVideos;
