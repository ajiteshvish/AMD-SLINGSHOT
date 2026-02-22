
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const RoleSelection = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSelectRole = async (role: 'user' | 'admin') => {
    if (!user) return;
    
    setLoading(true);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store role in localStorage
    localStorage.setItem('demo_role', role);
    
    // Navigate to appropriate dashboard
    window.location.href = role === 'admin' ? '/admin' : '/dashboard';
  };

  return (
    <div className="auth-container">
      <div className="auth-card role-card">
        <h2>Select Your Role</h2>
        <p className="auth-subtitle">Choose how you want to use Trustora</p>
        
        <div className="role-options">
          <button 
            className="role-btn" 
            onClick={() => handleSelectRole('user')}
            disabled={loading}
          >
            <div className="role-icon">👤</div>
            <h3>Consumer</h3>
            <p>Shop safely with trust scores</p>
          </button>
          
          <button 
            className="role-btn" 
            onClick={() => handleSelectRole('admin')}
            disabled={loading}
          >
            <div className="role-icon">🛡️</div>
            <h3>Admin / Seller</h3>
            <p>Manage store reputation</p>
          </button>
        </div>
        
        {loading && <p className="loading-text">Setting up your account...</p>}
      </div>
    </div>
  );
};

export default RoleSelection;
