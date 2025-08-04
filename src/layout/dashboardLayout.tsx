import Sidebar from '@/components/sidebar'
import Topbar from '@/components/topbar'
import { Outlet } from 'react-router'

export default function DashboardLayout() {
  return (
    <>
        <Sidebar />
        <Topbar />
        <Outlet />
    </>
  )
}
