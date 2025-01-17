import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsTrash, BsClock, BsPerson, BsPhone, BsFileText } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from './ApiConfig';

const AdminConcerns = () => {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const mainColor = '#ff8fc7';

  // Custom styles
  const styles = {
    header: {
      background: `linear-gradient(135deg, ${mainColor} 0%, #ff5fa5 100%)`,
      padding: '2rem',
      borderRadius: '12px',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    card: {
      borderRadius: '12px',
      border: 'none',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      marginBottom: '1.5rem',
      overflow: 'hidden',
    },
    deleteButton: {
      color: mainColor,
      border: `1px solid ${mainColor}`,
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      transition: 'all 0.2s ease',
      backgroundColor: 'white',
    },
    badge: {
      backgroundColor: mainColor,
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.875rem',
    },
    imagePreview: {
      cursor: 'pointer',
      borderRadius: '8px',
      maxWidth: '150px',
      height: 'auto',
    },
  };

  // Fetch concerns
  const fetchConcerns = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/help-requests`);
      setConcerns(response.data);
    } catch (error) {
      setError('Failed to fetch concerns');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete concern
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this concern?')) {
      try {
        await axios.delete(`${API_BASE_URL}/help-requests/${id}`);
        // Refresh concerns after deletion
        fetchConcerns();
      } catch (error) {
        setError('Failed to delete concern');
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    fetchConcerns();
  }, []);

  // Format timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  // Image modal
  const ImageModal = ({ show, onClose, imageUrl }) => {
    if (!show) return null;
    
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <div style={{ maxWidth: '90%', maxHeight: '90%' }}>
          <img
            src={imageUrl}
            alt="Full size screenshot"
            style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
          />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" style={{ color: mainColor }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div style={styles.header} className="text-white mb-4">
        <h1 className="display-5 fw-bold mb-0">User Concerns Dashboard</h1>
        <p className="mt-2 mb-0">Manage and respond to user concerns</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Concerns List */}
      <div className="row">
        {concerns.map((concern) => (
          <div key={concern.id} className="col-12 mb-4">
            <div className="card" style={styles.card}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: mainColor }}>
                      <BsPerson className="me-2" />
                      {concern.name}
                    </h5>
                    <p className="text-muted mb-2">
                      <BsPhone className="me-2" />
                      {concern.phoneNumber}
                    </p>
                    <p className="text-muted mb-2">
                      <BsFileText className="me-2" />
                      App ID: {concern.applicationId}
                    </p>
                    <p className="text-muted mb-0">
                      <BsClock className="me-2" />
                      {formatDate(concern.timestamp)}
                    </p>
                  </div>
                  <button
                    className="btn"
                    style={styles.deleteButton}
                    onClick={() => handleDelete(concern.id)}
                  >
                    <BsTrash className="me-2" />
                    Delete
                  </button>
                </div>

                <div className="p-3 bg-light rounded-3">
                  <p className="mb-0">{concern.concern}</p>
                </div>

                {concern.image && (
                  <div className="mt-3">
                    <p className="text-muted mb-2">Attached Screenshot:</p>
                    <img
                      src={concern.image}
                      alt="Concern screenshot"
                      style={styles.imagePreview}
                      onClick={() => {
                        setSelectedImage(concern.image);
                        setShowImageModal(true);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <ImageModal
        show={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default AdminConcerns;