import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/service/authService';
import { useAuth } from './useAuth';
import type { LoginCredentials } from '@/types/auth';

export const useLoginMutation = () => {
  const { handleLogin } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => AuthService.login(credentials),
    onSuccess: (data) => {
      if (data && data.token) {
        handleLogin(data?.user, data.token);
        localStorage.setItem('authToken', data.token);  
      }
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });
};
