import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from './ApiConfig';

const NotificationManager = () => {
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  // Fetch notifications from the API
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/notifications`);
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Add or edit a notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`${API_BASE_URL}/notifications/${isEditing}`, { message });
        setIsEditing(null);
      } catch (error) {
        console.error('Error updating notification:', error);
      }
    } else {
      try {
        await axios.post(`${API_BASE_URL}/notifications`, { message });
      } catch (error) {
        console.error('Error creating notification:', error);
      }
    }
    setMessage('');
    fetchNotifications();
  };

  // Delete a notification
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/notifications/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Start editing a notification
  const startEditing = (id, currentMessage) => {
    setIsEditing(id);
    setMessage(currentMessage);
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#ffd5e7',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    header: {
      color: 'white',
      fontSize: '1.5rem',
      backgroundColor: '#ff7eb6',
      padding: '10px',
      borderRadius: '10px',
    },
    form: {
      margin: '20px 0',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    submitButton: {
      backgroundColor: '#ff7eb6',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    submitButtonHover: {
      backgroundColor: '#e5679d',
    },
    list: {
      marginTop: '20px',
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    itemButton: {
      backgroundColor: '#ff7eb6',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
      margin:"5px"
    },
    itemButtonHover: {
      backgroundColor: '#e5679d',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Notification Management</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Notification Message *</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          required
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.submitButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
        >
          {isEditing ? 'Update Notification' : 'Send Notification'}
        </button>
      </form>
      <div style={styles.list}>
        {notifications.map((notif) => (
          <div key={notif.id} style={styles.item}>
            <p>{notif.message}</p>
            <div>
              <button
                style={styles.itemButton}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.itemButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.itemButton.backgroundColor)}
                onClick={() => startEditing(notif.id, notif.message)}
              >
                Edit
              </button>
              <button
                style={styles.itemButton}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.itemButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.itemButton.backgroundColor)}
                onClick={() => handleDelete(notif.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationManager;
