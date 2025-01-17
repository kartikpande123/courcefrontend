import React, { useState, useEffect } from 'react';
import { BsBell, BsCalendar, BsChevronDown } from 'react-icons/bs';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from './ApiConfig';

const Notificationsuser = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState(new Set());

  // Color scheme
  const colors = {
    primary: '#6B48FF',
    secondary: '#F3F0FF',
    accent: '#FFB648',
    border: '#E6E1F9',
    text: '#2D2A3F',
    subtext: '#6E6A85',
  };

  // Custom styles
  const styles = {
    header: {
      background: "#005f73",
      padding: '2.5rem',
      borderRadius: '16px',
      marginBottom: '2rem',
      boxShadow: '0 4px 20px rgba(107, 72, 255, 0.15)',
    },
    notificationCard: {
      borderRadius: '12px',
      border: `1.5px solid black`,
      backgroundColor: 'white',
      padding: '1.5rem',
      marginBottom: '1rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    badge: {
      backgroundColor: colors.accent,
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
    },
    date: {
      color: colors.subtext,
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    expandButton: {
      border: 'none',
      background: 'none',
      color: colors.primary,
      fontSize: '0.875rem',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      cursor: 'pointer',
    },
  };

  // Fetch notifications with sorting
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/notifications`);
        
        // Sort notifications by timestamp (newest first)
        const sortedNotifications = [...response.data].sort((a, b) => {
          // Handle Firestore timestamp objects
          const getTimestampMs = (notification) => {
            if (!notification.timestamp) return 0;
            
            // If it's a Firestore timestamp object
            if (notification.timestamp._seconds) {
              return (notification.timestamp._seconds * 1000) + 
                     (notification.timestamp._nanoseconds / 1000000);
            }
            
            // If it's a regular timestamp
            return new Date(notification.timestamp).getTime();
          };

          const timeA = getTimestampMs(a);
          const timeB = getTimestampMs(b);
          
          // Debug logging
          console.log('Notification A:', a.title, 'Time:', new Date(timeA).toISOString());
          console.log('Notification B:', b.title, 'Time:', new Date(timeB).toISOString());
          
          // Sort in descending order (newest first)
          return timeB - timeA;
        });

        setNotifications(sortedNotifications);
      } catch (error) {
        setError('Failed to load notifications');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Format date with Firestore timestamp handling
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      // Handle Firestore timestamp
      if (timestamp._seconds) {
        const milliseconds = (timestamp._seconds * 1000) + 
                           (timestamp._nanoseconds / 1000000);
        const date = new Date(milliseconds);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
      
      // Handle regular timestamp
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // Toggle notification expansion
  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Calculate if text needs expansion
  const needsExpansion = (text) => text.length > 150;

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" style={{ color: colors.primary }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div style={styles.header} className="text-white">
        <div className="d-flex align-items-center gap-3 mb-2">
          <BsBell size={24} />
          <h1 className="h3 mb-0 fw-bold">Course Notifications</h1>
        </div>
        <p className="mb-0 mt-2 opacity-75">
          Stay updated with the latest announcements and course updates
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Notifications List */}
      <div className="notifications-container">
        {notifications.length === 0 ? (
          <div className="text-center py-5" style={{ color: colors.subtext }}>
            <BsBell size={40} className="mb-3" />
            <h5>No notifications yet</h5>
            <p>Check back later for updates about your courses</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              style={styles.notificationCard}
              className="notification-card"
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex gap-2 align-items-center">
                  {notification.type && (
                    <span style={styles.badge}>
                      {notification.type}
                    </span>
                  )}
                  <span style={styles.date}>
                    <BsCalendar />
                    {formatDate(notification.timestamp)}
                  </span>
                </div>
              </div>

              <h5 style={{ color: colors.text, fontWeight: '600' }}>
                {notification.title}
              </h5>

              <div style={{ color: colors.subtext }}>
                {needsExpansion(notification.message) && !expandedIds.has(notification.id) ? (
                  <>
                    <p className="mb-2">
                      {notification.message.substring(0, 150)}...
                    </p>
                    <button
                      style={styles.expandButton}
                      onClick={() => toggleExpand(notification.id)}
                    >
                      Read more <BsChevronDown />
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mb-2">
                      {notification.message}
                    </p>
                    {needsExpansion(notification.message) && (
                      <button
                        style={styles.expandButton}
                        onClick={() => toggleExpand(notification.id)}
                      >
                        Show less <BsChevronDown style={{ transform: 'rotate(180deg)' }} />
                      </button>
                    )}
                  </>
                )}
              </div>

              {notification.link && (
                <a
                  href={notification.link}
                  className="mt-3 d-inline-block"
                  style={{ color: colors.primary, textDecoration: 'none' }}
                >
                  Learn more →
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notificationsuser;