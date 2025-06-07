import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import UserDetailsAdmin from "./components/UserDetailsAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { UserProvider } from "./context/UserContext";
import HistoryPage from "./components/HistoryPage";
import AdminPanel from "./components/AdminPanel";
import PasswordResetForm from "./components/PasswordResetForm";

function App() {
  return (
    <UserProvider>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset-password" element={<PasswordResetForm />} />
          {/* Ochrona dashboardu */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
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
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute>
                <UserDetailsAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
    </UserProvider>
  );
}

export default App;
