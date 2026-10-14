import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import MetricCard from '../components/MetricCard.jsx';
import PostCard from '../components/PostCard.jsx';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { useTheme } from '../context/ThemeContext.jsx';

const Overview = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#273249' : '#e5e7eb';
  const axisColor = isDark ? '#94a3b8' : '#6b7280';
  const pieColors = isDark
    ? ['#38bdf8', '#f472b6', '#818cf8', '#e5e7eb']
    : ['#0ea5e9', '#e1306c', '#0a66c2', '#111827'];

  const chartData = [
    { day: 'Mon', engagement: 4200 },
    { day: 'Tue', engagement: 3000 },
    { day: 'Wed', engagement: 2000 },
    { day: 'Thu', engagement: 2780 },
    { day: 'Fri', engagement: 1890 },
    { day: 'Sat', engagement: 2390 },
    { day: 'Sun', engagement: 3490 },
  ];

  const platformData = [
    { name: 'Twitter', value: 35 },
    { name: 'Instagram', value: 30 },
    { name: 'LinkedIn', value: 20 },
    { name: 'TikTok', value: 15 },
  ];

  const recentPosts = [
    {
      id: 1,
      author: 'Vamsi Vankayala',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      time: '2 hours ago',
      content: 'Just launched the new dashboard! 🚀 Check it out and let me know what you think.',
      image: '/images/posts/post-dashboard.svg',
      likes: 234, comments: 45, shares: 12,
    },
    {
      id: 2,
      author: 'Tech Tips',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      time: '4 hours ago',
      content: 'Pro tip: Always backup your work before making major changes.',
      likes: 567, comments: 89, shares: 34,
    },
  ];

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h1>Welcome Back, Vamsi! 👋</h1>
        <p>Here's your social media performance overview</p>
      </div>

      <div className="metrics-grid">
        <MetricCard icon={Heart} label="Total Engagement" value="12.5K" change="8.2%" trend="up" platform="twitter" />
        <MetricCard icon={MessageCircle} label="Total Followers" value="45.3K" change="12.5%" trend="up" platform="instagram" />
        <MetricCard icon={Share2} label="Reach" value="234K" change="5.3%" trend="up" platform="linkedin" />
        <MetricCard icon={Heart} label="Avg Likes" value="1.2K" change="3.1%" trend="down" platform="tiktok" />
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Engagement Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ fill: '#4f46e5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Platform Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Posts</h3>
        <div className="posts-list">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;