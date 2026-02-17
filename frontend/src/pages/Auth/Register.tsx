import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create profile in Supabase (default role: user, or null to force selection)
      const { error: dbError } = await supabase
        .from('profiles')
        .insert([
          { id: user.uid, email: user.email, role: 'user' } // Defaulting to 'user' for now
        ]);

      if (dbError) throw dbError;

      navigate('/role-selection');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join Trustora today</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Create a password"
            />
          </div>
          
          <button type="submit" className="btn btn-primary full-width">Sign Up</button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
