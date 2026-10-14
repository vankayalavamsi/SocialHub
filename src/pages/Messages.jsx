import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

const initialChats = [
  { id: 1, name: 'Anjali', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', lastMessage: 'That sounds great!', timestamp: '2 hours ago', online: true, unread: 2 },
  { id: 2, name: 'Navya', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', lastMessage: 'See you tomorrow!', timestamp: '4 hours ago', online: true, unread: 0 },
  { id: 3, name: 'Tech Community', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', lastMessage: 'Thanks for sharing!', timestamp: '1 day ago', online: false, unread: 0 },
];

const initialMessages = {
  1: [
    { id: 1, sender: 'other', text: 'Hey! How are you?', timestamp: '10:30 AM' },
    { id: 2, sender: 'me', text: "Hi! I'm doing great, thanks for asking!", timestamp: '10:31 AM' },
    { id: 3, sender: 'other', text: 'That sounds great!', timestamp: '10:32 AM' },
  ],
  2: [
    { id: 1, sender: 'other', text: 'Are we still on for tomorrow?', timestamp: '9:02 AM' },
    { id: 2, sender: 'me', text: 'Yes, see you at 10!', timestamp: '9:05 AM' },
    { id: 3, sender: 'other', text: 'See you tomorrow!', timestamp: '9:06 AM' },
  ],
  3: [
    { id: 1, sender: 'other', text: 'Thanks for sharing your article!', timestamp: 'Yesterday' },
    { id: 2, sender: 'me', text: 'Glad the community enjoyed it!', timestamp: 'Yesterday' },
  ],
};

const BOT_REPLIES = [
  'Sounds good! 👍',
  "Interesting, let me check on that.",
  'Haha, nice one! 😄',
  "I'll get back to you soon.",
  'Perfect, thanks for the update!',
  'That works for me.',
];

const nowTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const Messages = () => {
  const [chats, setChats] = useState(initialChats);
  const [messagesByChat, setMessagesByChat] = useState(initialMessages);
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageText, setMessageText] = useState('');
  const [typingChatId, setTypingChatId] = useState(null);
  const messagesEndRef = useRef(null);

  const activeChat = chats[selectedChat];
  const messages = messagesByChat[activeChat.id] || [];

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingChatId]);

  const handleSendMessage = () => {
    const text = messageText.trim();
    if (!text) return;

    const chatId = activeChat.id;

    setMessagesByChat((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), { id: Date.now(), sender: 'me', text, timestamp: nowTime() }],
    }));

    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, lastMessage: text, timestamp: 'Just now' } : c))
    );

    setMessageText('');

    // Simulated reply: typing indicator, then a response
    setTypingChatId(chatId);
    setTimeout(() => {
      const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      setMessagesByChat((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), { id: Date.now(), sender: 'other', text: reply, timestamp: nowTime() }],
      }));
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, lastMessage: reply, timestamp: 'Just now' } : c))
      );
      setTypingChatId(null);
    }, 1600);
  };

  return (
    <div className="messages-container">
      <div className="chats-sidebar">
        <h2>Messages</h2>
        <div className="chats-list">
          {chats.map((chat, index) => (
            <button
              key={chat.id}
              className={`chat-item ${selectedChat === index ? 'active' : ''}`}
              onClick={() => setSelectedChat(index)}
            >
              <div className="chat-avatar">
                <img src={chat.avatar} alt={chat.name} />
                {chat.online && <span className="online-indicator"></span>}
              </div>
              <div className="chat-info">
                <div className="chat-name">{chat.name}</div>
                <div className="chat-preview">{chat.lastMessage}</div>
              </div>
              <div className="chat-meta">
                <div className="chat-time">{chat.timestamp}</div>
                {chat.unread > 0 && <div className="unread-badge">{chat.unread}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header-info">
            <img src={activeChat.avatar} alt={activeChat.name} />
            <div>
              <h3>{activeChat.name}</h3>
              <p className={activeChat.online ? 'online' : ''}>
                {activeChat.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </div>

        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">{msg.text}</div>
              <div className="message-time">{msg.timestamp}</div>
            </div>
          ))}

          {typingChatId === activeChat.id && (
            <div className="typing-bubble">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="message-input-area">
          <div className="input-actions">
            <button className="chat-action-btn" aria-label="Attach file"><Paperclip size={20} /></button>
            <button className="chat-action-btn" aria-label="Emoji"><Smile size={20} /></button>
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-btn" onClick={handleSendMessage} aria-label="Send">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;