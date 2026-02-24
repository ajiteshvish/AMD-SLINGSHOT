
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CustomCursor from './components/ui/CustomCursor';
import AnimatedBackground from './components/ui/AnimatedBackground';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import RoleSelection from './pages/Auth/RoleSelection';
import UserDashboard from './pages/User/UserDashboard';
import SellerDetails from './pages/User/SellerDetails';
import CompareSellers from './pages/User/CompareSellers';
import Alerts from './pages/User/Alerts';
import Settings from './pages/User/Settings';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { SellerMonitoring, RiskAlerts, AIMonitoring, ModelSettings, APIConfiguration } from './pages/Admin/AdminPlaceholders';
import IntelligenceDashboard from './pages/Intelligence/IntelligenceDashboard';
import Demo from './pages/Demo';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import OurTeam from './pages/OurTeam';

// Styles
import './App.css';
import './pages/Auth/Auth.css'; // Import auth styles globally or per component

function App() {
  return (
    <AuthProvider>
      <CustomCursor />
      <AnimatedBackground />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/team" element={<OurTeam />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/role-selection" element={<RoleSelection />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/seller/:id" element={<SellerDetails />} />
            <Route path="/intelligence" element={<IntelligenceDashboard />} /> {/* New Route */}
            <Route path="/compare" element={<CompareSellers />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/monitoring" element={<SellerMonitoring />} />
            <Route path="/admin/alerts" element={<RiskAlerts />} />
            <Route path="/admin/ai" element={<AIMonitoring />} />
            <Route path="/admin/model" element={<ModelSettings />} />
            <Route path="/admin/api" element={<APIConfiguration />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
