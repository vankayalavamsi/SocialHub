import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Overview from './pages/Overview.jsx';
import Posts from './pages/Posts.jsx';
import Analytics from './pages/Analytics.jsx';
import Messages from './pages/Messages.jsx';
import Followers from './pages/Followers.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const mainRef = useRef(null);

  // Scroll to top whenever the page changes
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'posts': return <Posts />;
      case 'analytics': return <Analytics />;
      case 'messages': return <Messages />;
      case 'followers': return <Followers />;
      case 'settings': return <Settings />;
      default: return <Overview />;
    }
  };

  return (
    <div className="app">
      <Navbar onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <div className="app-container">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isOpen={sidebarOpen}
        />
        <div className="main-content" ref={mainRef}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;