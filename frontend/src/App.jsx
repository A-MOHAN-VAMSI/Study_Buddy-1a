import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateExam from './pages/CreateExam';
import TakeExam from './pages/TakeExam';
import ExamResults from './pages/ExamResults';
import Students from "./pages/Students";
import AdminLayout from "./components/layout/AdminLayout";
import StudentProfile from "./pages/StudentProfile";
import Analytics from "./pages/Analytics";
import StudentExams from "./pages/StudentExams";
import StudentResults from "./pages/StudentResults";
import StudentAnalytics from "./pages/StudentAnalytics";
import StudentSettings from "./pages/StudentSettings";
import AdminSettings from "./pages/AdminSettings";
// Dashboard Switcher Route for "/"
const HomeDashboard = () => {
  const userString = localStorage.getItem("user");

  if (!userString) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userString);

    return user.role === "admin"
      ? <Navigate to="/admin" replace />
      : <StudentDashboard />;
  } catch {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <>
        {/* Navbar will render automatically if user is logged in */}
        
        
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Student / Admin Switcher */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomeDashboard />
                </ProtectedRoute>
              }
            />
            

            {/* Student Exam taking */}
            <Route
              path="/take-exam/:id"
              element={
                <ProtectedRoute>
                  <TakeExam />
                </ProtectedRoute>
              }
            />

            {/* Common Exam Attempt Results review */}
            <Route
              path="/results/attempt/:id"
              element={
                <ProtectedRoute>
                  <ExamResults />
                </ProtectedRoute>
              }
            />

            <Route
  path="/exams"
  element={
    <ProtectedRoute>
      <StudentExams />
    </ProtectedRoute>
  }
/>

<Route
  path="/results"
  element={
    <ProtectedRoute>
      <StudentResults />
    </ProtectedRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <StudentAnalytics />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <StudentSettings />
    </ProtectedRoute>
  }
/>

            {/* Admin Dedicated Routes */}
            <Route
    path="students/:id"
    element={<StudentProfile />}
/>
            
            <Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminLayout />
    </ProtectedRoute>
  }
>

  <Route index element={<AdminDashboard />} />

  <Route
    path="create-exam"
    element={<CreateExam />}
  />

  <Route
    path="students"
    element={<Students />}
  />

  <Route
  path="analytics"
  element={<Analytics />}
/>

  <Route
  path="settings"
  element={<AdminSettings />}
/>

</Route>
            

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </>
    </Router>
  );
}



export default App;
