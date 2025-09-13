import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from 'lucide-react'
import HomeRoutes from './Routes/Home'
import Navbar from './components/home/Navbar'
import Footer from './components/home/FooterSection'
import Aboutroutes from './Routes/About'
import Coursesroutes from './Routes/Courses'
import SACTroutes from './Routes/SACT'
import Scroll from './Scroll'
import SATroutes from './Routes/SAT'
import Contactsroutes from './Routes/Contacts'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import ForgotPassword from './components/Authentication/ForgotPassword'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Certificateroutes from './Routes/Certificate';
import StudentDashboard from "./Dashboard/StudentDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";
// PrivateRoute for role-based protection
import PrivateRoute from "./Routes/PrivateRoute";

export const App = () => {
  return (
    <Router>
      <Scroll/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomeRoutes/>}/>
        <Route path='/about' element={<Aboutroutes/>}/>
        <Route path='/courses' element={<Coursesroutes/>}/>
        <Route path='/sact' element={<SACTroutes/>}/>
        <Route path='/sat' element={<SATroutes/>}/>
        <Route path='/contacts' element={<Contactsroutes/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/verify' element={<Certificateroutes/>}/>


          {/* Student Dashboard */}
        <Route path="/dashboard/student" element={
          <PrivateRoute role="student">
            <StudentDashboard />
          </PrivateRoute>
        } />

        {/* Admin Dashboard */}
        <Route path="/dashboard/admin" element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
      <Footer/>
    </Router>
  )
}
