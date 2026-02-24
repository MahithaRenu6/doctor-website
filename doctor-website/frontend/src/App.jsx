import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import LandingPage from "./pages/LandingPage";

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return user.role === "doctor" ? <Navigate to="/doctor-dashboard" /> : <Navigate to="/patient-dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route index element={<DashboardRedirect />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            </Route>

            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
