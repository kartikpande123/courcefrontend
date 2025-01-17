import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import logo from '../Images/Logo.jpg';

const AboutUs = () => {
  const navigate = useNavigate();

  // Inline styles (adding new typography styles)
  const styles = {
    primaryColor: '#005f73',
    secondaryBg: '#f8f9fa',
    cardHover: {
      transition: 'box-shadow 0.3s ease-in-out',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      borderRadius: '10px'
    },
    gradientBg: {
      background: 'linear-gradient(180deg, #e6f3f5 0%, #ffffff 100%)',
      paddingBottom: '50px'
    },
    heroImage: {
      height: '150px',
      width: '150px',
      borderRadius: '50%',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
    },
    heroSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 0'
    },
    mainTitle: {
      fontSize: '2.5rem',
      color: '#005f73',
      fontWeight: 'bold',
      marginTop: '20px'
    },
    sectionTitle: {
      fontSize: '2rem',
      color: '#005f73',
      fontWeight: '600',
      marginBottom: '20px'
    },
    subsectionTitle: {
      fontSize: '1.5rem',
      color: '#005f73',
      fontWeight: '600',
      marginBottom: '15px'
    },
    footer: {
      backgroundColor: '#005f73',
      color: '#ffffff',
      padding: '20px',
      textAlign: 'center',
      position: 'relative'
    },
    developerSection: {
      backgroundColor: '#e6f3f5',
      padding: '40px 0',
      marginTop: '40px'
    },
    adminIcon: {
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '24px',
      color: '#ffffff'
    },
    contactLabel: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#005f73',
      width: '120px'
    },
    contactValue: {
      fontSize: '1.1rem',
      flex: '1'
    },
    contactWrapper: {
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: 'white',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }
  };

  const handleAdminClick = () => {
    navigate('/login');
  };

  return (
    <div style={styles.gradientBg}>
      {/* Hero Section */}
      <header style={styles.heroSection}>
        <img
          src={logo}
          alt="Success Online Course Logo"
          style={styles.heroImage}
        />
        <h1 style={styles.mainTitle}>
          Success Online Course
        </h1>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* About Section */}
        <section className="text-center mx-auto py-5" style={{ maxWidth: '768px' }}>
          <h2 style={styles.sectionTitle}>
            Transforming Education Through Digital Excellence
          </h2>
          <p className="text-muted mt-3" style={{ fontSize: '1.2rem' }}>
            Founded on January 17, 2025, Success Online Course is a premier e-learning platform 
            dedicated to delivering high-quality, accessible education to learners worldwide.
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="row g-4 py-5">
          <div className="col-md-6">
            <div style={styles.cardHover}>
              <h3 style={styles.subsectionTitle}>Our Mission</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                To empower individuals through accessible, high-quality online education that 
                transforms careers and enriches lives.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div style={styles.cardHover}>
              <h3 style={styles.subsectionTitle}>Our Vision</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                To be the world's leading online learning platform, recognized for excellence,
                innovation, and student success.
              </p>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <section className="py-5">
          <h2 style={styles.sectionTitle} className="text-center">Our Values</h2>
          <div className="row g-4">
            {[{
              title: "Excellence",
              description: "Committed to delivering the highest quality education"
            }, {
              title: "Innovation",
              description: "Continuously evolving our teaching methods and technology"
            }, {
              title: "Student Success",
              description: "Prioritizing learner achievement and growth"
            }].map((value, index) => (
              <div key={index} className="col-md-4">
                <div style={styles.cardHover}>
                  <h3 style={styles.subsectionTitle}>{value.title}</h3>
                  <p className="text-muted" style={{ fontSize: '1.1rem' }}>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-5" style={{ backgroundColor: '#e6f3f5' }}>
          <h2 style={styles.sectionTitle} className="text-center mb-4">Contact Us</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div style={styles.contactWrapper}>
                <div className="d-flex align-items-start gap-3">
                  <div style={styles.contactLabel}>Name</div>
                  <div style={styles.contactValue}>Mohammad R Nadaf</div>
                </div>
              </div>

              <div style={styles.contactWrapper}>
                <div className="d-flex align-items-start gap-3">
                  <div style={styles.contactLabel}>Email</div>
                  <div style={styles.contactValue}>successonlinecource@gmail.com</div>
                </div>
              </div>

              <div style={styles.contactWrapper}>
                <div className="d-flex align-items-start gap-3">
                  <div style={styles.contactLabel}>Contact No</div>
                  <div style={styles.contactValue}>+91 6360785195,          +91 9482759409</div>
                </div>
              </div>

              <div style={styles.contactWrapper}>
                <div className="d-flex align-items-start gap-3">
                  <div style={styles.contactLabel}>Address</div>
                  <div style={styles.contactValue}>
                    At Mahalingpur<br />
                    Tq. Mudalagi<br />
                    Dist. Belagavi<br />
                    Pincode: 591136
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section style={styles.developerSection}>
          <h2 style={styles.sectionTitle} className="text-center">Developed By</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div style={styles.cardHover} className="text-center">
                <h3 style={styles.subsectionTitle}>AK Software Developers</h3>
                <p className="text-muted" style={{ fontSize: '1.1rem' }}>Lead Developer: Kartik Pande</p>
                <p className="text-muted" style={{ fontSize: '1.1rem' }}>Delivering innovative solutions for modern education</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={{ fontSize: '1.1rem' }}>&copy; 2025/2026 Success Online Course. All rights reserved.</p>
        <FaUserCog 
          style={styles.adminIcon}
          onClick={handleAdminClick}
          title="Admin Login"
          aria-label="Admin Login"
        />
      </footer>
    </div>
  );
};

export default AboutUs;