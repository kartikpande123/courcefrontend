import React, { useState } from "react";
import { FaPlusCircle, FaBook, FaRegAddressCard, FaEnvelope, FaMoneyBillWave, FaBell, FaVideo, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from '../Images/Logo.jpg';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ... (keep all your existing styles)
  const navbarStyle = {
    backgroundColor: '#ff85c5',
    padding: '20px 0',
    width: '100%',
    height: '120px',
    boxShadow: '0 4px 12px rgba(255, 133, 197, 0.3)'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  };

  const navbarBrandStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff'
  };

  const logoStyle = {
    height: '90px',
    width: 'auto',
    marginRight: '20px',
    borderRadius: '50%',
    border: '3px solid #fff'
  };

  const brandTextStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const logoutBtnStyle = {
    backgroundColor: '#fff',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ff85c5',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };

  const headerStyle = {
    textAlign: 'center',
    padding: '10px 0',
    backgroundColor: '#ffecf5',
    marginBottom: '30px'
  };

  const gridContainerStyle = {
    maxWidth: '1400px',
    margin: '20px auto',
    padding: '0 30px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '25px',
    padding: '20px 0'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#ff85c5',
    border: 'none',
    borderRadius: '15px',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(255, 133, 197, 0.3)',
  };

  const iconStyle = {
    fontSize: '32px',
    marginBottom: '15px',
    color: '#fff'
  };

  const buttonTextStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    marginTop: '10px'
  };

  // New Modal Styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(255, 133, 197, 0.4)',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center'
  };

  const modalTitleStyle = {
    color: '#ff85c5',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
  };

  const modalButtonsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '25px'
  };

  const modalButtonStyle = {
    padding: '12px 25px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    border: 'none'
  };

  const buttons = [
    { icon: <FaPlusCircle />, text: "Add Category", path: "/category" },
    { icon: <FaBook />, text: "Add Course", path: "/addcource" },
    { icon: <FaRegAddressCard />, text: "Application Status", path: "/applicants" },
    { icon: <FaEnvelope />, text: "Queries", path: "/concerns" },
    { icon: <FaMoneyBillWave />, text: "Payments", path: "/payments" },
    { icon: <FaBell />, text: "Add Notification", path: "/adminnotification" },
    { icon: <FaVideo />, text: "G-Meet Link", path: "/admingmeet" },
    { icon: <FaUsers />, text: "Candidates", path: "/selectedcandidates" }
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('adminLoggedIn'); // Clear the adminLoggedIn key
    navigate('/'); // Redirect to the home page or login page
    setShowLogoutModal(false); // Close the modal
  };

  const handleButtonHover = (e, isHover) => {
    e.currentTarget.style.transform = isHover ? 'translateY(-5px)' : 'translateY(0)';
    e.currentTarget.style.backgroundColor = isHover ? '#ff9dce' : '#ff85c5';
  };

  const handleLogoutHover = (e, isHover) => {
    e.currentTarget.style.transform = isHover ? 'scale(1.05)' : 'scale(1)';
    e.currentTarget.style.backgroundColor = isHover ? '#ffecf5' : '#fff';
  };

  return (
    <div style={{ backgroundColor: '#fff0f7', minHeight: '100vh' }}>
      <nav style={navbarStyle}>
        <div style={containerStyle}>
          <a href="#" style={navbarBrandStyle}>
            <img src={logo} alt="Success Online Course Logo" style={logoStyle} />
            <span style={brandTextStyle}>Success Online Course</span>
          </a>
          <button 
            style={logoutBtnStyle}
            onClick={handleLogout}
            onMouseOver={(e) => handleLogoutHover(e, true)}
            onMouseOut={(e) => handleLogoutHover(e, false)}
          >
            Logout
          </button>
        </div>
      </nav>

      <header style={headerStyle}>
        <h1 style={{ margin: 0, color: '#ff85c5', fontSize: '36px', fontWeight: 'bold' }}>
          Admin Dashboard
        </h1>
      </header>

      <div style={gridContainerStyle}>
        <div style={gridStyle}>
          {buttons.map((item, index) => (
            <button
              key={index}
              style={buttonStyle}
              onClick={() => navigate(item.path)}
              onMouseOver={(e) => handleButtonHover(e, true)}
              onMouseOut={(e) => handleButtonHover(e, false)}
            >
              <div style={iconStyle}>{item.icon}</div>
              <span style={buttonTextStyle}>{item.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={modalTitleStyle}>Confirm Logout</h2>
            <p style={{ color: '#666', fontSize: '16px' }}>Are you sure you want to logout?</p>
            <div style={modalButtonsStyle}>
              <button
                style={{
                  ...modalButtonStyle,
                  backgroundColor: '#ff85c5',
                  color: '#fff',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff9dce'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff85c5'}
                onClick={confirmLogout}
              >
                Yes, Logout
              </button>
              <button
                style={{
                  ...modalButtonStyle,
                  backgroundColor: '#fff',
                  color: '#ff85c5',
                  border: '2px solid #ff85c5',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffecf5'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;