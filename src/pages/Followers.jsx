import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import FollowerCard from '../components/FollowerCard.jsx';
import { useToast } from '../context/ToastContext.jsx';

const FOLLOWERS = [
  { id: 1, name: 'Anjali', handle: '@anjali', bio: 'Tech enthusiast & Designer', followers: '5.2K', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Varun Kumar', handle: '@varun', bio: 'Full-stack developer', followers: '3.8K', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Surya Kumar', handle: '@surya', bio: 'UX/UI Designer', followers: '4.5K', avatar: 'https://randomuser.me/api/portraits/men/85.jpg' },
  { id: 4, name: 'Navya', handle: '@navya', bio: 'Open source contributor', followers: '2.1K', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'following', label: 'Following' },
  { id: 'notFollowing', label: 'Not Following' },
];

const Followers = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState('all');

  // Persist follow state across refreshes
  const [following, setFollowing] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('following') || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('following', JSON.stringify(following));
  }, [following]);

  const handleFollow = (follower) => {
    const willFollow = !following[follower.id];
    setFollowing((prev) => ({ ...prev, [follower.id]: willFollow }));
    showToast(willFollow ? `You followed ${follower.name}` : `Unfollowed ${follower.name}`);
  };

  const q = searchTerm.toLowerCase();
  const filtered = FOLLOWERS.filter(
    (f) => f.name.toLowerCase().includes(q) || f.handle.toLowerCase().includes(q)
  );

  const visible =
    tab === 'all'
      ? filtered
      : filtered.filter((f) => (tab === 'following') === !!following[f.id]);

  const followingCount = Object.values(following).filter(Boolean).length;

  return (
    <div className="followers-container">
      <div className="followers-header">
        <h1>Followers</h1>
        <p>Total Followers: 45.3K · {followingCount} following</p>
      </div>

      <div className="page-row">
        <div className="search-field followers-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search followers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="followers-grid">
          {visible.map((follower) => (
            <FollowerCard
              key={follower.id}
              follower={follower}
              isFollowing={following[follower.id]}
              onFollow={() => handleFollow(follower)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">No users found in this view</div>
      )}
    </div>
  );
};

export default Followers;