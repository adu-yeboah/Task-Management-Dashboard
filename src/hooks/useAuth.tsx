/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMe, logout, setCredentials } from '@/redux/authSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import type { User } from '@/types/auth';
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

  const getUser = (user: User) => {
    dispatch(getMe({user}))
  }

  return {
    auth,
    handleLogin,
    handleLogout,
    getUser,
  };
};