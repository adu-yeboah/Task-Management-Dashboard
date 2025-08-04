/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout, setCredentials } from '@/redux/authSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';


export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogin = (user: any, token: string) => {
    dispatch(setCredentials({ user, token }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    auth,
    handleLogin,
    handleLogout,
  };
};