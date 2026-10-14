import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2 } from 'lucide-react';

const PostCard = ({ post, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the ⋯ menu when clicking outside
  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const likeCount = post.likes + (liked ? 1 : 0);

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <img src={post.avatar} alt={post.author} />
          <div>
            <div className="author-name">{post.author}</div>
            <div className="post-time">{post.time}</div>
          </div>
        </div>

        <div className="post-menu" ref={menuRef}>
          <button
            className="post-menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Post options"
          >
            <MoreHorizontal size={18} />
          </button>
          {menuOpen && onDelete && (
            <div className="post-menu-dropdown">
              <button
                className="danger"
                onClick={() => {
                  onDelete(post.id);
                  setMenuOpen(false);
                }}
              >
                <Trash2 size={15} /> Delete post
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post content" className="post-image" />}
      </div>

      <div className="post-stats">
        <span>{likeCount} Likes</span>
        <span>{post.comments} Comments</span>
        <span>{post.shares} Shares</span>
      </div>

      <div className="post-actions">
        <button
          className={`action-btn ${liked ? 'liked' : ''}`}
          onClick={() => setLiked((l) => !l)}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          {liked ? 'Liked' : 'Like'}
        </button>
        <button className="action-btn"><MessageCircle size={18} /> Comment</button>
        <button className="action-btn"><Share2 size={18} /> Share</button>
      </div>
    </div>
  );
};

export default PostCard;