import React, { useState } from 'react';
import API_BASE_URL from './ApiConfig';

function ApplicationLinkFinder() {
  const [applicationId, setApplicationId] = useState('');
  const [meetLink, setMeetLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!applicationId.trim()) {
      setError('Please enter an application ID');
      return;
    }
  
    try {
      setIsLoading(true);
      setError(null);
      setApplicationData(null);
      setSearched(true);
  
      const appResponse = await fetch(`${API_BASE_URL}/applications`);
      if (!appResponse.ok) {
        throw new Error('Failed to fetch applications');
      }
  
      const { data } = await appResponse.json();
      const appData = Object.values(data).find(app => app.applicationId === applicationId);
  
      if (!appData) {
        throw new Error('Application not found');
      }

      const applicationWithStatus = {
        ...appData,
        status: appData.status || 'PENDING'
      };
  
      setApplicationData(applicationWithStatus);
  
      if (applicationWithStatus.status !== 'SELECTED') {
        setError(`Your application status is: ${applicationWithStatus.status}. Only selected applications can access the meet link.`);
        return;
      }
  
      const meetResponse = await fetch(`${API_BASE_URL}/meetlinks/all`);
      if (!meetResponse.ok) {
        throw new Error('Failed to fetch meet links');
      }
  
      const meetData = await meetResponse.json();
      const matchingMeetLink = meetData.data.find(
        link => link.courseTitle.toLowerCase() === applicationWithStatus.courseName.toLowerCase()
      );
  
      if (!matchingMeetLink) {
        throw new Error('Meet link not found for this course');
      }
  
      setMeetLink(matchingMeetLink);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
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
    form: {
      display: 'flex',
      gap: '12px',
      marginBottom: '25px',
    },
    input: {
      flex: '1',
      padding: '14px',
      fontSize: '16px',
      border: '2px solid #e0e3e5',
      borderRadius: '10px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      '&:focus': {
        borderColor: '#005f73',
      },
    },
    button: {
      padding: '14px 28px',
      backgroundColor: '#005f73',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: '#004957',
      },
      '&:disabled': {
        backgroundColor: '#cccccc',
      },
    },
    resultContainer: {
      marginTop: '25px',
      padding: '25px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e0e3e5',
    },
    error: {
      color: '#dc2626',
      padding: '15px',
      backgroundColor: '#fee2e2',
      borderRadius: '8px',
      marginTop: '15px',
      border: '1px solid #fecaca',
    },
    loading: {
      textAlign: 'center',
      color: '#005f73',
      padding: '20px',
      fontWeight: '500',
    },
    meetLink: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#e6f3f5',
      borderRadius: '8px',
      border: '1px solid #005f73',
    },
    link: {
      color: '#005f73',
      textDecoration: 'none',
      fontWeight: '500',
      wordBreak: 'break-all',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    details: {
      marginTop: '15px',
      lineHeight: '1.8',
      color: '#333333',
    },
    status: {
      fontWeight: '600',
      color: '#005f73',
      marginTop: '15px',
      padding: '8px 12px',
      backgroundColor: '#e6f3f5',
      borderRadius: '6px',
      display: 'inline-block',
    },
    instruction: {
      color: '#666666',
      marginBottom: '25px',
      textAlign: 'center',
      fontSize: '16px',
    },
    label: {
      fontWeight: '600',
      color: '#005f73',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Course Link Finder</h1>
      </div>
      
      <p style={styles.instruction}>
        Enter your application ID to get your course meet link
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          placeholder="Enter Application ID"
          style={styles.input}
        />
        <button 
          type="submit" 
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Checking...' : 'Find Link'}
        </button>
      </form>

      {isLoading && (
        <div style={styles.loading}>Checking application status...</div>
      )}

      {error && (
        <div style={styles.error}>{error}</div>
      )}

      {applicationData && !error && (
        <div style={styles.resultContainer}>
          <div style={styles.details}>
            <p><span style={styles.label}>Course: </span>{applicationData.courseName}</p>
            <p><span style={styles.label}>Name: </span>{applicationData.name}</p>
            <p><span style={styles.label}>Application Date: </span>
            {new Date(applicationData.applicationDate).toLocaleDateString()}</p>
            <div style={styles.status}>
              Status: {applicationData.status}
            </div>
          </div>

          {meetLink && (
            <div style={styles.meetLink}>
              <strong>Your Class Link:</strong><br />
              <a 
                href={meetLink.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {meetLink.meetLink}
              </a>
            </div>
          )}
        </div>
      )}

      {searched && !applicationData && !error && !isLoading && (
        <div style={styles.error}>
          No application found with this ID. Please check and try again.
        </div>
      )}
    </div>
  );
}

export default ApplicationLinkFinder;