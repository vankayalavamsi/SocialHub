import React from 'react';

const MetricCard = ({ icon: Icon, label, value, change, trend, platform }) => {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className={`metric-icon ${platform}`}>
          <Icon size={22} />
        </div>
        <span className="metric-label">{label}</span>
      </div>
      <div className="metric-body">
        <div className="metric-value">{value}</div>
        <div className={`metric-change ${trend}`}>
          <span>{trend === 'up' ? '↑' : '↓'}</span>
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;