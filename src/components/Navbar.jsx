import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, Search, Bell, MessageCircle, User, Settings, LogOut, Sun, Moon, Check,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const Navbar = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState(null);
  const navbarRef = useRef(null);
  const searchRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { id: 1, actor: 'Vinod', action: 'liked your post', read: false },
    { id: 2, actor: 'Varun Kumar', action: 'started following you', read: false },
    { id: 3, actor: 'Tech Community', action: 'shared your article', read: false },
    { id: 4, actor: 'Anjali', action: 'commented on your post', read: true },
    { id: 5, actor: 'Navya', action: 'mentioned you', read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Press "/" anywhere to focus search
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggle = (name) => setOpenDropdown((prev) => (prev === name ? null : name));

  const markRead = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <Menu size={22} />
        </button>
        <div className="logo">
          <div className="logo-icon">📱</div>
          <span>SocialHub</span>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-field">
          <Search size={18} />
          <input ref={searchRef} type="text" placeholder="Search posts, people...  ( / )" />
        </div>
      </div>

      <div className="navbar-right">
        {/* Dark mode toggle */}
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="notification-dropdown">
          <button className="icon-btn" onClick={() => toggle('notifications')} aria-label="Notifications">
            <Bell size={20} />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>
          {openDropdown === 'notifications' && (
            <div className="dropdown-menu">
              <div className="dropdown-header dropdown-header-row">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <button className="mark-read-btn" onClick={markAllRead}>
                    <Check size={14} /> Mark all read
                  </button>
                )}
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`notification-item ${n.read ? 'read' : 'unread'}`}
                  onClick={() => markRead(n.id)}
                >
                  {!n.read && <span className="unread-dot" />}
                  <span><strong>{n.actor}</strong> {n.action}</span>
                </div>
              ))}
              <div className="dropdown-footer">View All</div>
            </div>
          )}
        </div>

        <div className="message-dropdown">
          <button className="icon-btn" aria-label="Messages">
            <MessageCircle size={20} />
            <span className="badge">3</span>
          </button>
        </div>

        <div className="profile-dropdown">
          <button className="profile-btn" onClick={() => toggle('profile')} aria-label="Profile menu">
            <img src="/images/avatars/avatar-vamsi.svg" alt="Profile" />
          </button>
          {openDropdown === 'profile' && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="user-info">
                  <img src="/images/avatars/avatar-vamsi.svg" alt="Profile" />
                  <div>
                    <div className="user-name">Vamsi Vankayala</div>
                    <div className="user-handle">@vamsi</div>
                  </div>
                </div>
              </div>
              <button className="dropdown-item"><User size={16} /> My Profile</button>
              <button className="dropdown-item"><Settings size={16} /> Settings</button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout"><LogOut size={16} /> Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;