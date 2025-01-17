import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle, Search } from 'lucide-react';
import API_BASE_URL from './ApiConfig';

const ApplicationStatusChecker = () => {
  const [applicationId, setApplicationId] = useState('');
  const [applicationData, setApplicationData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!applicationId.trim()) {
      setError('Please enter an application ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/applications`);
      const result = await response.json();
      
      if (result.success && result.data) {
        const application = result.data[applicationId];
        if (application) {
          setApplicationData({
            ...application,
            status: application.status || 'PENDING'
          });
          setError('');
        } else {
          setError('Application not found');
          setApplicationData(null);
        }
      } else {
        setError('Failed to fetch application details');
      }
    } catch (err) {
      setError('Error checking application status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      container: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        color: 'white',
      },
      text: {
        marginLeft: '8px',
        fontWeight: '600'
      }
    };

    switch (status) {
      case 'SELECTED':
        return {
          container: {
            ...baseStyle.container,
            backgroundColor: '#22c55e',
          },
          text: baseStyle.text
        };
      case 'REJECTED':
        return {
          container: {
            ...baseStyle.container,
            backgroundColor: '#dc2626',
          },
          text: baseStyle.text
        };
      default:
        return {
          container: {
            ...baseStyle.container,
            backgroundColor: '#6b7280',
          },
          text: baseStyle.text
        };
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0, 95, 115, 0.15)',
    },
    titleContainer: {
      textAlign: 'center',
      marginBottom: '30px',
      padding: '15px',
      backgroundColor: '#005f73',
      borderRadius: '10px',
      border: '2px solid #004957',
    },
    title: {
      fontSize: '28px',
      color: '#ffffff',
      margin: '0',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      marginBottom: '25px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#005f73',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Application Status Checker</h1>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="input-group mb-3" style={styles.buttonContainer}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Application ID"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
              />
              <button 
                className="btn"
                onClick={checkStatus}
                disabled={loading}
                style={styles.button}
              >
                <Search size={16} />
                <span>{loading ? 'Checking...' : 'Check Status'}</span>
              </button>
            </div>

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            {applicationData && (
              <div>
                <div className="text-center mb-4">
                  <div style={getStatusStyle(applicationData.status).container}>
                    {applicationData.status === 'SELECTED' && <CheckCircle size={24} />}
                    {applicationData.status === 'PENDING' && <Clock size={24} />}
                    {applicationData.status === 'REJECTED' && <XCircle size={24} />}
                    <span style={getStatusStyle(applicationData.status).text}>
                      {applicationData.status}
                    </span>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">Applicant Name</h6>
                        <p className="card-text">{applicationData.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">Course Name</h6>
                        <p className="card-text">{applicationData.courseName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">City</h6>
                        <p className="card-text">{applicationData.city}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">State</h6>
                        <p className="card-text">{applicationData.state}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">Application Date</h6>
                        <p className="card-text">
                          {new Date(applicationData.applicationDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">Course Fees</h6>
                        <p className="card-text">₹{applicationData.courseFees}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusChecker;