import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { UserProvider } from "./context/UserContext";
import HistoryPage from "./components/HistoryPage";
import AdminPanel from "./components/AdminPanel";
import PasswordResetForm from "./components/PasswordResetForm";
import DefaultDashboard from "./components/DefaultDashboard.jsx";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  return (
    <UserProvider>

        <Routes>
          <Route path="/" element={<DefaultDashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/change-password" element={<PasswordResetForm />} />
          {/* Ochrona dashboardu */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <UserProfile />
                </ProtectedRoute>
            } />

            {/* Ochrona history */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
            />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                < AdminPanel/>
              </AdminRoute>
            }/>
        </Routes>
    </UserProvider>
  );
}

export default App;
