import { useTheme } from '@/context/themeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router';

export default function Topbar() {
  const { toggleTheme } = useTheme()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate("/login", { replace: true })
  }
  return (
    <header className="relative top-0 right-0  z-50 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 p-3 flex justify-end">

      <button
        onClick={handleLogout}
        className="flex flex-row items-center gap-1 p-2 rounded-md bg-gray-200 mr-4 dark:bg-gray-700 text-gray-700 dark:text-red-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        <IoLogOutOutline size={20} />
        Logout
      </button>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 mr-4 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        aria-label="Toggle dark mode"
      >
        <FiSun className="hidden dark:block" size={20} />
        <FiMoon className="dark:hidden" size={20} />
      </button>
    </header>
  );
}