import React, { useState } from 'react';
import {
  ComposedChart, Area, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../context/ThemeContext.jsx';

const DATA_7D = [
  { date: 'Jan 1', likes: 120, comments: 90, shares: 45, views: 2400 },
  { date: 'Jan 2', likes: 150, comments: 110, shares: 60, views: 2810 },
  { date: 'Jan 3', likes: 200, comments: 140, shares: 80, views: 3200 },
  { date: 'Jan 4', likes: 180, comments: 130, shares: 70, views: 3000 },
  { date: 'Jan 5', likes: 220, comments: 160, shares: 95, views: 3400 },
  { date: 'Jan 6', likes: 240, comments: 180, shares: 110, views: 3800 },
  { date: 'Jan 7', likes: 280, comments: 200, shares: 130, views: 4200 },
];

const DATA_30D = [
  { date: 'Day 1', likes: 95, comments: 65, shares: 28, views: 1800 },
  { date: 'Day 4', likes: 140, comments: 95, shares: 45, views: 2300 },
  { date: 'Day 7', likes: 120, comments: 80, shares: 38, views: 2100 },
  { date: 'Day 10', likes: 175, comments: 120, shares: 60, views: 2900 },
  { date: 'Day 13', likes: 160, comments: 110, shares: 55, views: 2650 },
  { date: 'Day 16', likes: 210, comments: 150, shares: 80, views: 3300 },
  { date: 'Day 19', likes: 190, comments: 130, shares: 70, views: 3050 },
  { date: 'Day 22', likes: 245, comments: 175, shares: 100, views: 3650 },
  { date: 'Day 25', likes: 230, comments: 165, shares: 92, views: 3450 },
  { date: 'Day 28', likes: 280, comments: 200, shares: 130, views: 4200 },
];

const Analytics = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#273249' : '#e5e7eb';
  const axisColor = isDark ? '#94a3b8' : '#6b7280';

  const [range, setRange] = useState('7d');
  const engagementData = range === '7d' ? DATA_7D : DATA_30D;

  const audienceData = [
    { age: '13-17', value: 8 },
    { age: '18-24', value: 35 },
    { age: '25-34', value: 28 },
    { age: '35-44', value: 18 },
    { age: '45+', value: 11 },
  ];

  const topPosts = [
    { title: 'Dashboard Launch', engagement: 2341, reach: 8932 },
    { title: 'GitHub Milestone', engagement: 1856, reach: 6234 },
    { title: 'Feature Release', engagement: 1245, reach: 4523 },
  ];

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>

      <div className="analytics-section">
        <div className="analytics-section-header">
          <h2>Engagement Over Time</h2>
          <div className="tabs">
            <button
              className={`tab ${range === '7d' ? 'active' : ''}`}
              onClick={() => setRange('7d')}
            >
              7 Days
            </button>
            <button
              className={`tab ${range === '30d' ? 'active' : ''}`}
              onClick={() => setRange('30d')}
            >
              30 Days
            </button>
          </div>
        </div>
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="views" stroke="#4f46e5" fill={isDark ? '#312e81' : '#eef2ff'} fillOpacity={1} />
              <Line type="monotone" dataKey="likes" stroke="#4f46e5" strokeWidth={2} />
              <Line type="monotone" dataKey="comments" stroke="#16a34a" strokeWidth={2} />
              <Line type="monotone" dataKey="shares" stroke="#d97706" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-section">
          <h2>Audience by Age</h2>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={audienceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="age" stroke={axisColor} />
                <YAxis stroke={axisColor} />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-section">
          <h2>Top Posts</h2>
          <div className="top-posts-list">
            {topPosts.map((post, index) => (
              <div key={index} className="top-post-item">
                <div className="post-rank">{index + 1}</div>
                <div className="post-details">
                  <div className="post-title">{post.title}</div>
                  <div className="top-post-stats">
                    <span>{post.engagement} engagements</span>
                    <span>{post.reach} reach</span>
                  </div>
                </div>
                <div className="post-performance">
                  <div className="perf-bar">
                    <div
                      className="perf-fill"
                      style={{ width: `${(post.engagement / 2341) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="key-metrics">
        <h2>Key Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-box">
            <div className="metric-label">Avg Engagement Rate</div>
            <div className="metric-value">4.8%</div>
            <div className="metric-change">↑ 0.3% from last week</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Total Reach</div>
            <div className="metric-value">234K</div>
            <div className="metric-change">↑ 12% from last week</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Follower Growth</div>
            <div className="metric-value">2.3K</div>
            <div className="metric-change">↑ 8% from last week</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Best Time to Post</div>
            <div className="metric-value">6 PM</div>
            <div className="metric-change">Peak engagement hour</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;