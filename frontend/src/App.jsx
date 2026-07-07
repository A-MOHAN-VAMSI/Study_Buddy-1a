import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateExam from './pages/CreateExam';
import TakeExam from './pages/TakeExam';
import ExamResults from './pages/ExamResults';

// Dashboard Switcher Route for "/"
const HomeDashboard = () => {
  const userString = localStorage.getItem('user');
  if (!userString) return <Navigate to="/login" replace />;

  try {
    const user = JSON.parse(userString);
    if (user.role === 'admin') {
      return <AdminDashboard />;
    }
    return <StudentDashboard />;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        {/* Navbar will render automatically if user is logged in */}
        <Navbar />
        
        <main style={styles.mainContent}>
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

            {/* Admin Dedicated Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/create-exam"
              element={
                <ProtectedRoute adminOnly={true}>
                  <CreateExam />
                </ProtectedRoute>
              }
            />

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
  },
};

export default App;
