import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/service/authService';
import { useAuth } from './useAuth';
import type { LoginCredentials } from '@/types/auth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export const useLoginMutation = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => AuthService.login(credentials),
    onSuccess: (data) => {
      console.log(data)
      if (data && data.accessToken) {
        handleLogin(data, data.accessToken);
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        toast.success("login succesful")
        navigate('/', { replace: true });
      }
    },
    onError: (error: unknown) => {
      toast.error("Invalid Credentials")
      console.error(error);
    },
  });
};
