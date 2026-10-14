import React from 'react';

const FollowerCard = ({ follower, isFollowing, onFollow }) => {
  return (
    <div className="follower-card">
      <img src={follower.avatar} alt={follower.name} className="follower-avatar" />
      <div className="follower-info">
        <div className="follower-name">{follower.name}</div>
        <div className="follower-handle">{follower.handle}</div>
        <div className="follower-bio">{follower.bio}</div>
        <div className="follower-count">
          <span>{follower.followers} Followers</span>
        </div>
      </div>
      <button
        className={`follow-btn ${isFollowing ? 'following' : ''}`}
        onClick={() => onFollow(follower.id)}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default FollowerCard;