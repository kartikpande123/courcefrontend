import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaVideo,
  FaClipboard,
  FaBell,
  FaQuestionCircle,
  FaUserCircle,
  FaUser,
  FaClock,
  FaCalendarAlt,
  FaSearch,
  FaRupeeSign
} from 'react-icons/fa';
import './UserDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import API_BASE_URL from './ApiConfig';
import logo from '../Images/Logo.jpg';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper function to format date as dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Helper function to convert 24-hour time to 12-hour format with AM/PM
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    let period = 'AM';
    let hours12 = parseInt(hours);
    
    if (hours12 >= 12) {
      period = 'PM';
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }
    if (hours12 === 0) {
      hours12 = 12;
    }
    
    return `${hours12}:${minutes} ${period}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notificationsRes, coursesRes, categoriesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/notifications`),
          axios.get(`${API_BASE_URL}/courses`),
          axios.get(`${API_BASE_URL}/categories`)
        ]);

        setNotificationCount(notificationsRes.data.length || 0);
        
        // Sort courses by Firestore timestamp
        const sortedCourses = [...(coursesRes.data || [])].sort((a, b) => {
          const getTimestampMs = (course) => {
            if (!course.createdAt) return 0;
            
            // Handle Firestore timestamp object
            if (course.createdAt._seconds) {
              return (course.createdAt._seconds * 1000) + (course.createdAt._nanoseconds / 1000000);
            }
            return 0;
          };

          const timeA = getTimestampMs(a);
          const timeB = getTimestampMs(b);
          
          // Debug logging
          console.log('Course:', a.title, 'Time:', new Date(timeA).toISOString());
          console.log('Course:', b.title, 'Time:', new Date(timeB).toISOString());
          
          // Sort in descending order (newest first)
          return timeB - timeA;
        });

        setCourses(sortedCourses);
        setCategories(categoriesRes.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title && searchTerm 
      ? course.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      : false; // fallback to false if either is undefined or not a string
  
    const matchesCategory = selectedCategory === 'all' || course.categoryId === selectedCategory;
  
    return matchesSearch && matchesCategory;
  });
  
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleViewDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center justify-content-center" href="/">
            <img 
              src={logo} 
              alt="Success Online Course Logo" 
              className="me-2"
              style={{ height: '90px', width: 'auto', borderRadius:"50%" }} 
            />
            <span className="brand-text">Success Online Course</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="g-meet">
                  <FaVideo className="me-2" /> G-Meet
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="appstatus">
                  <FaClipboard className="me-2" /> Track Admission
                </a>
              </li>
              <li className="nav-item position-relative">
                <a className="nav-link" href="notification">
                  <FaBell className="me-2" /> Notifications
                  {notificationCount > 0 && (
                    <span className="notification-badge">
                      {notificationCount > 3 ? '3+' : notificationCount}
                    </span>
                  )}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="aboutus">
                  <FaUser className="me-2" /> About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="help">
                  <FaQuestionCircle className="me-2" /> Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="search-filter-container">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="col">
                  <div className="course-card">
                    <h3 className="course-title" style={{fontSize: "1.65rem"}}>{course.title}</h3>
                    <div className="course-info">
                      <div className="info-item">
                        <FaCalendarAlt className="info-icon" />
                        <span>Date: {formatDate(course.startDate)}</span>
                      </div>
                      <div className="info-item">
                        <FaClock className="info-icon" />
                        <span>Start Time: {formatTime(course.startTime)}</span>
                      </div>
                      <div className="info-item">
                        <FaClock className="info-icon" />
                        <span>End Time: {formatTime(course.endTime)}</span>
                      </div>
                      <div className="info-item">
                        <FaRupeeSign className="info-icon" />
                        <span>INR {course.fees}</span>
                      </div>
                      <div className="info-item">
                        <FaCalendarAlt className="info-icon" />
                        <span>Last Date to Apply: {formatDate(course.lastDateToApply)}</span>
                      </div>
                    </div>
                    {new Date(course.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                      <div className="new-course-badge">New</div>
                    )}
                    <button 
                      className="view-details-btn"
                      onClick={() => handleViewDetails(course.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;