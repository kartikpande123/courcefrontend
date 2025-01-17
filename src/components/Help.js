import React, { useState, useEffect } from 'react';
import { BsImage, BsSend } from 'react-icons/bs';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from './ApiConfig';

const HelpSection = () => {
  const [formData, setFormData] = useState({
    applicationId: '',
    name: '',
    phoneNumber: '',
    concern: '',
    imageBase64: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [concerns, setConcerns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const MAX_FILE_SIZE_MB = 5;

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileSelect = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        // Check file size before conversion
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > MAX_FILE_SIZE_MB) {
          setError(`Image size must be less than ${MAX_FILE_SIZE_MB}MB. Current size: ${fileSizeInMB.toFixed(2)}MB`);
          e.target.value = ''; // Reset file input
          setSelectedFile(null);
          setFormData(prev => ({
            ...prev,
            imageBase64: ''
          }));
          return;
        }

        const base64 = await convertToBase64(file);
        setSelectedFile(file);
        setFormData(prev => ({
          ...prev,
          imageBase64: base64
        }));
        setError(null); // Clear any previous errors
      }
    } catch (error) {
      console.error("Error converting image:", error);
      setError("Failed to process the image. Please try again.");
      setSelectedFile(null);
      setFormData(prev => ({
        ...prev,
        imageBase64: ''
      }));
    }
  };

  const headerStyle = {
    background: '#005f73',
    padding: '2rem',
    borderRadius: '8px 8px 0 0',
    marginBottom: '0',
  };

  const cardStyle = {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: 'none',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '2rem auto',
  };

  const inputStyle = {
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    padding: '12px',
  };

  const fetchConcerns = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/help-requests`);
      setConcerns(response.data);
    } catch (error) {
      console.error("Error fetching concerns:", error);
      setError("Failed to fetch concerns");
    }
  };

  useEffect(() => {
    fetchConcerns();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Configure axios to handle larger payload
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      };

      await axios.post(`${API_BASE_URL}/help-requests`, formData, config);
      setShowSuccessPopup(true);
      setFormData({
        applicationId: '',
        name: '',
        phoneNumber: '',
        concern: '',
        imageBase64: '',
      });
      setSelectedFile(null);
      fetchConcerns();
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting concern:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to submit your concern. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container py-4">
      <div className="card" style={cardStyle}>
        <div style={headerStyle}>
          <h2 className="text-center text-white display-6 fw-bold mb-2">
            How Can We Help You?
          </h2>
          <p className="text-center text-white mb-0">
            Submit your concern and we'll get back to you as soon as possible!
          </p>
        </div>
        
        <div className="card-body bg-white p-4">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Application ID with Label */}
            <div className="mb-3">
              <label htmlFor="applicationId" className="form-label">
                Application ID (Optional)
              </label>
              <input
                type="text"
                className="form-control"
                id="applicationId"
                name="applicationId"
                value={formData.applicationId}
                onChange={handleInputChange}
                placeholder="Enter your Application ID if available"
                style={inputStyle}
              />
            </div>

            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your Name"
                required
                style={inputStyle}
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your Phone Number"
                required
                style={inputStyle}
              />
            </div>

            {/* Concern Textarea */}
            <div className="mb-4">
              <label htmlFor="concern" className="form-label">Your Concern</label>
              <textarea
                className="form-control"
                id="concern"
                name="concern"
                value={formData.concern}
                onChange={handleInputChange}
                placeholder="Describe your concern here... 
Note: Please provide specific details about your issue to help us assist you better.
- What problem are you facing?
- When did it start?
- What have you tried so far?"
                rows="5"
                required
                style={inputStyle}
              />
            </div>
            
            {/* File Upload */}
            <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
              <div>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="d-none"
                  id="image-upload"
                  accept="image/*"
                />
                <button
                  type="button"
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={() => document.getElementById('image-upload').click()}
                  style={{ borderRadius: '6px' }}
                >
                  <BsImage />
                  <span>Add Screenshot</span>
                </button>
              </div>
              
              {selectedFile && (
                <span className="text-muted">
                  Selected: {selectedFile.name}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-end">
              <button 
                type="submit"
                className="btn btn-primary d-flex align-items-center gap-2"
                disabled={isLoading}
                style={{
                  background: '#4158D0',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                }}
              >
                <BsSend />
                <span>{isLoading ? 'Submitting...' : 'Submit Concern'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div 
          className="position-fixed top-50 start-50 translate-middle p-3 bg-success text-white rounded"
          style={{ zIndex: 1050 }}
        >
          <p className="mb-0">Thank you! We'll get back to you soon.</p>
        </div>
      )}
    </div>
  );
};

export default HelpSection;