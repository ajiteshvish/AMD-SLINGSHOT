
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabase';

const RoleSelection = () => {
  const { user } = useAuth();


  const handleSelectRole = async (role: 'user' | 'admin') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.uid, email: user.email, role: role });

      if (error) throw error;
      
      // Force page reload to refresh context or handle it via local state update if implemented
      window.location.href = role === 'admin' ? '/admin' : '/dashboard';
    } catch (err) {
      console.error('Error updating role:', err);
    }
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
          >
            <div className="role-icon">👤</div>
            <h3>Consumer</h3>
            <p>Shop safely with trust scores</p>
          </button>
          
          <button 
            className="role-btn" 
            onClick={() => handleSelectRole('admin')}
          >
            <div className="role-icon">🛡️</div>
            <h3>Admin / Seller</h3>
            <p>Manage store reputation</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
