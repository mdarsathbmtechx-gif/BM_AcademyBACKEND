import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scroll from "./Scroll";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/FooterSection";

// Website pages
import HomeRoutes from "./Routes/Home";
import Aboutroutes from "./Routes/About";
import Coursesroutes from "./Routes/Courses";
import SACTroutes from "./Routes/SACT";
import SATroutes from "./Routes/SAT";
import Contactsroutes from "./Routes/Contacts";
import Certificateroutes from "./Routes/Certificate";

// Auth
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ForgotPassword from "./components/Authentication/ForgotPassword";

// Dashboards
import StudentDashboard from "./Dashboard/StudentDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageCourses from "./components/Admin/ManageCourses";
import ManageUsers from "./components/Admin/ManageUsers";

// Role-based protection
import PrivateRoute from "./Routes/PrivateRoute";

export const App = () => {
  return (
    <Router>
      <Scroll />

      <Routes>
        {/* Public Website Layout */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomeRoutes />} />
                <Route path="/about" element={<Aboutroutes />} />
                <Route path="/courses/*" element={<Coursesroutes />} />
                <Route path="/sact" element={<SACTroutes />} />
                <Route path="/sat" element={<SATroutes />} />
                <Route path="/contacts" element={<Contactsroutes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/verify" element={<Certificateroutes />} />
              </Routes>
              <Footer />
            </>
          }
        />

      
        {/* Admin Dashboard (separate layout, no Navbar/Footer) */}
        <Route path="/dashboard/admin" element={<AdminDashboard />}>
          <Route path="courses" element={<ManageCourses />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </Router>
  );
};



import { GoogleOAuthProvider } from "@react-oauth/google";

<GoogleOAuthProvider clientId="281995264661-d17guc355o5thv4q7r5ukpn0dgggcfss.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>



