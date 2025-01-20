import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import CategoryManager from './components/AdminCategory';
import AdminCourseAdd from './components/AdminAddCource';
import NotificationComponent from './components/AdminNotification';
import HelpSection from './components/Help';
import AdminConcerns from './components/AdminConcern';
import Notificationsuser from './components/Notification';
import CourseDetails from './components/CourseDetails';
import CourseApplicationForm from './components/CourseApplicationForm';
import Applicants from './components/Applicants';
import SelectedCandidates from './components/Candidates';
import Payments from './components/Payments';
import AdminGmeet from './components/AdminGmeet';
import AllGmeets from './components/AllGmeet';
import ApplicationLinkFinder from './components/ApplicationLinkFinder';
import ApplicationStatusChecker from './components/StdStatus';
import AdminLogin from './components/AdminLogin';
import AboutUs from './components/AboutUs';
import Protected from './components/Protected';
import AttendanceManagement from './components/Adminattendace';
import AttendanceDisplay from './components/AttendanceWatch';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<Protected><AdminDashboard /></Protected>} />
        <Route path="/category" element={<Protected><CategoryManager /></Protected>} />
        <Route path="/addcource" element={<Protected><AdminCourseAdd /></Protected>} />
        <Route path="/adminnotification" element={<NotificationComponent />} />
        <Route path="/help" element={<HelpSection />} />
        <Route path="/concerns" element={<Protected><AdminConcerns /></Protected>
          } />
        <Route path="/notification" element={<Notificationsuser/>} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/form" element={<CourseApplicationForm />} />
        <Route path="/applicants" element={<Protected><Applicants /></Protected>} />
        <Route path="/selectedcandidates" element={<Protected><SelectedCandidates /></Protected>} />
        <Route path="/payments" element={<Protected><Payments /></Protected>} />
        <Route path="/admingmeet" element={<Protected><AdminGmeet /></Protected>} />
        <Route path="/allgmeets" element={<Protected><AllGmeets /></Protected>} />
        <Route path="/g-meet" element={<ApplicationLinkFinder />} />
        <Route path="/appstatus" element={<ApplicationStatusChecker />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/attendancecheck" element={<Protected><AttendanceManagement /></Protected>} />
        <Route path="/attendacedisplay" element={<Protected><AttendanceDisplay /></Protected>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
