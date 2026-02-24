import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SignInFlo } from '@/components/ui/sign-in-flo';

const Register = () => {
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: { email: string; password: string; name?: string }) => {
    setError('');

    if (data.password.length < 6) {
      setError('Password must be at least 6 characters');
      throw new Error('Password too short');
    }

    try {
      await signup(data.email, data.password);
      navigate('/role-selection');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      throw err;
    }
  };

  return (
    <SignInFlo
      mode="signup"
      onSubmit={handleSubmit}
      onToggleMode={() => navigate('/login')}
      error={error}
    />
  );
};

export default Register;
