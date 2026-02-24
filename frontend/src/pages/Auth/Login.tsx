import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SignInFlo } from '@/components/ui/sign-in-flo';

const Login = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: { email: string; password: string }) => {
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    }
  };

  return (
    <SignInFlo
      mode="signin"
      onSubmit={handleSubmit}
      onToggleMode={() => navigate('/register')}
      error={error}
    />
  );
};

export default Login;
