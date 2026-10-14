import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Heart, MessageCircle, Share2, X, Image } from 'lucide-react';
import PostCard from '../components/PostCard.jsx';
import { useToast } from '../context/ToastContext.jsx';

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Vamsi Vankayala',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    time: '2 hours ago',
    content: 'Just launched the new dashboard! 🚀 Check it out and let me know what you think.',
    image: '/images/posts/post-dashboard.svg',
    likes: 234, comments: 45, shares: 12, views: 2341,
  },
  {
    id: 2,
    author: 'Vamsi Vankayala',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    time: '1 day ago',
    content: 'Excited to announce that our latest project has reached 10K stars on GitHub! 🌟',
    image: '/images/posts/post-github.svg',
    likes: 567, comments: 89, shares: 34, views: 5234,
  },
  {
    id: 3,
    author: 'Vamsi Vankayala',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    time: '2 days ago',
    content: 'Working on some cool new features for the platform. Stay tuned! 💻',
    likes: 345, comments: 67, shares: 23, views: 3456,
  },
];

const IMAGE_OPTIONS = [
  { label: 'Dashboard', src: '/images/posts/post-dashboard.svg' },
  { label: 'Stars', src: '/images/posts/post-github.svg' },
  { label: 'Code', src: '/images/posts/post-coding.svg' },
  { label: 'Launch', src: '/images/posts/post-launch.svg' },
];

const formatNum = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`);

const Posts = () => {
  const { showToast } = useToast();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', image: '' });

  // Stats computed from real data
  const totals = posts.reduce(
    (acc, p) => ({
      views: acc.views + (p.views || 0),
      likes: acc.likes + p.likes,
      comments: acc.comments + p.comments,
      shares: acc.shares + p.shares,
    }),
    { views: 0, likes: 0, comments: 0, shares: 0 }
  );

  const q = searchTerm.toLowerCase();
  const filteredPosts = posts.filter(
    (p) => p.content.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)
  );

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      showToast('Write something before publishing', 'error');
      return;
    }
    const post = {
      id: Date.now(),
      author: 'Vamsi Vankayala',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      time: 'Just now',
      content: newPost.content.trim(),
      image: newPost.image || null,
      likes: 0, comments: 0, shares: 0, views: 0,
    };
    setPosts((prev) => [post, ...prev]);
    setShowModal(false);
    setNewPost({ content: '', image: '' });
    showToast('Post published! 🎉');
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('Post deleted', 'error');
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1>Your Posts</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> New Post
        </button>
      </div>

      <div className="posts-filters">
        <div className="search-field">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn">
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="posts-stats">
        <div className="stat-box">
          <Eye size={20} />
          <div>
            <div className="stat-label">Total Views</div>
            <div className="stat-value">{formatNum(totals.views)}</div>
          </div>
        </div>
        <div className="stat-box">
          <Heart size={20} />
          <div>
            <div className="stat-label">Total Likes</div>
            <div className="stat-value">{formatNum(totals.likes)}</div>
          </div>
        </div>
        <div className="stat-box">
          <MessageCircle size={20} />
          <div>
            <div className="stat-label">Total Comments</div>
            <div className="stat-value">{totals.comments}</div>
          </div>
        </div>
        <div className="stat-box">
          <Share2 size={20} />
          <div>
            <div className="stat-label">Total Shares</div>
            <div className="stat-value">{totals.shares}</div>
          </div>
        </div>
      </div>

      <div className="posts-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} />
          ))
        ) : (
          <div className="empty-state">No posts match "{searchTerm}"</div>
        )}
      </div>

      {/* ===== Create Post Modal ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Post</h2>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <textarea
              className="modal-textarea"
              rows={4}
              maxLength={280}
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))}
            />
            <span className={`char-count ${newPost.content.length >= 280 ? 'over' : ''}`}>
              {newPost.content.length}/280
            </span>

            <div className="image-picker">
              <button
                className={`image-option ${!newPost.image ? 'selected' : ''}`}
                onClick={() => setNewPost((p) => ({ ...p, image: '' }))}
                title="No image"
              >
                <span className="image-option-none">No image</span>
              </button>
              {IMAGE_OPTIONS.map((img) => (
                <button
                  key={img.src}
                  className={`image-option ${newPost.image === img.src ? 'selected' : ''}`}
                  onClick={() => setNewPost((p) => ({ ...p, image: img.src }))}
                  title={img.label}
                >
                  <img src={img.src} alt={img.label} />
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreatePost}>
                <Plus size={16} /> Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;