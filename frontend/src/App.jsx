import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Login from "./components/Login";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";

// Dashboards
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from "./pages/TeacherDashboard";
import Notifications from "./pages/Notifications";

// Teacher / Admin Pages
import RequestBooking from "./pages/RequestBooking";

import Teacher from "./pages/TeacherAvailability";
import Teachers from "./pages/Teachers";

import Departments from "./pages/Departments";
import RoomAvailability from "./pages/RoomAvailability";
import RoomAdmin from "./pages/RoomAdmin";
import Rooms from "./pages/Rooms";
import RequestAdmin from "./pages/RequestAdmin";
import LabAdmin from "./pages/LabAdmin";
import Labs from "./pages/Labs";
import AnalyticsAdmin from "./pages/AnalyticsAdmin";
import FacultySchedule from "./pages/FacultySchedule";
import MergeRequests from "./pages/MergeRequests";
import LabAvailability from "./pages/LabAvailability";
import TeacherStudent from "./pages/TeacherStudent";
import StudentNotifications from "./pages/StudentNotifications";


function App() {
  return (
    <Routes>
      {/* 🔐 Login / Signup */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🏠 Landing */}
      <Route path="/" element={<Homepage />} />

      {/* 🎓 Student Dashboard */}
      <Route path="/studentdashboard" element={<StudentDashboard />} />

      {/* 👨‍🏫 Teacher Dashboard */}
      <Route path="/teacherdashboard" element={<TeacherDashboard />} />

      {/* 👨‍🏫 Teachers */}
      <Route path="/teachers" element={<Teachers />} />

      {/* Teacher */}
      <Route path="/teacherstudent" element={<TeacherStudent />} />

      { /* 🏢 Departments */}
      <Route path="/departments" element={<Departments />} />

      {/* Room Admin */}
      <Route path="/roomadmin" element={<RoomAdmin />} />

      {/* Rooms */}
      <Route path="/rooms" element={<Rooms />} />

      {/* Lab Admin */}
      <Route path="/labadmin" element={<LabAdmin />} />

      {/* Labs */}
      <Route path="/labs" element={<Labs />} />

        {/* Analytics Admin */} 
      <Route path="/analyticsadmin" element={<AnalyticsAdmin />} />

      {/* 🛠️ Admin Dashboard */}
      <Route path="/admindashboard" element={<AdminDashboard />} />

      {/* 🔔 Notifications */}
      <Route path="/notifications" element={<Notifications />} />

      {/* Student Notifications */}
      <Route path="/student-notifications" element={<StudentNotifications />} />

      {/* Request Admin */}
      <Route path="/requestadmin" element={<RequestAdmin />} />

      {/* MainLayout Pages (Teacher/Admin) */}
      <Route
        path="/request-booking"
        element={
          <MainLayout>
            <RequestBooking />
          </MainLayout>
        }
      />

      

      <Route
        path="/labsavailability"
        element={
          <MainLayout>
            <LabAvailability />
          </MainLayout>
        }
      />

      <Route
        path="/roomsavailability"
        element={
          <MainLayout>
            <RoomAvailability />
          </MainLayout>
        }
      />

      

      <Route
        path="/schedule"
        element={
          <MainLayout>
            <FacultySchedule />
          </MainLayout>
        }
      />

      <Route
        path="/Teacher"
        element={
          <MainLayout>
            <Teacher />
          </MainLayout>
        }
      />

      <Route
        path="/merge"
        element={
          <MainLayout>
            <MergeRequests />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;