/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from '@/components/sidebar'
import Topbar from '@/components/topbar'
import { useAuth } from '@/hooks/useAuth'
import Login from '@/pages/login'
import { AuthService } from '@/service/authService'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

export default function DashboardLayout() {
  const { getUser, auth } = useAuth()
  const token = localStorage.getItem("access_token");

    const { mutate } = useMutation({
    mutationFn: () => AuthService.getMe(),
    onSuccess: (data) => {      
      if (data) {
        getUser(data as any); 
      }
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (token && !auth.user) {
      mutate();
    }
  }, []);


  if (!token) {
    return <Login />
  }

  return (
    <>
      <Sidebar />
      <main className="bg-white overflow-hidden min-h-screen dark:bg-gray-700 md:ml-64 flex-1">
        <Topbar />
        <Outlet />
      </main>
    </>
  )
}
