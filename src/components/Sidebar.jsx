import React from 'react';
import { Home, FileText, BarChart3, Mail, Users, Settings } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, isOpen }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'followers', label: 'Followers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
                title={item.label}
              >
                <Icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {isOpen && (
        <div className="sidebar-promo">
          <div className="promo-content">
            <h3>Premium Plan</h3>
            <p>Unlock advanced analytics and scheduling</p>
            <button className="promo-btn">Upgrade Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;