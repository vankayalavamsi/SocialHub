import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();

  const [settings, setSettings] = useState({
    username: 'vamsivankayala',
    email: 'vamsi@example.com',
    bio: 'Tech enthusiast & content creator',
    website: 'https://vamsivankayala.com',
    notifications: true,
    emailNotifications: true,
    privateAccount: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = () => {
    showToast('Settings saved successfully!');
    console.log('Saved settings:', settings);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="settings-grid">
        <div className="settings-section">
          <h2>Profile Settings</h2>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={settings.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={settings.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={settings.bio}
              onChange={handleChange}
              maxLength={160}
              placeholder="Tell about yourself"
            ></textarea>
            <span className={`char-count ${settings.bio.length >= 160 ? 'over' : ''}`}>
              {settings.bio.length}/160
            </span>
          </div>
          <div className="form-group">
            <label>Website</label>
            <input type="url" name="website" value={settings.website} onChange={handleChange} />
          </div>
        </div>

        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="form-group">
            <label>Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">light</option>
              <option value="dark">dark</option>
            </select>
          </div>

          <h2 style={{ marginTop: 24 }}>Privacy & Notifications</h2>
          <div className="form-group checkbox">
            <input type="checkbox" id="notifications" name="notifications" checked={settings.notifications} onChange={handleChange} />
            <label htmlFor="notifications">Push Notifications</label>
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="emailNotifications" name="emailNotifications" checked={settings.emailNotifications} onChange={handleChange} />
            <label htmlFor="emailNotifications">Email Notifications</label>
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="privateAccount" name="privateAccount" checked={settings.privateAccount} onChange={handleChange} />
            <label htmlFor="privateAccount">Private Account</label>
          </div>
        </div>

        <div className="settings-section">
          <h2>Account Actions</h2>
          <button className="btn btn-secondary">Change Password</button>
          <button className="btn btn-secondary">Two-Factor Authentication</button>
          <button className="btn btn-danger">Delete Account</button>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;