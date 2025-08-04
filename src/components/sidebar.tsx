import { Link, useLocation } from 'react-router';
import { FaTasks } from 'react-icons/fa';
import { MdDashboard, MdAddTask } from 'react-icons/md';

export default function Sidebar() {
  const location = useLocation();

  // Navigation items
  const navItems = [
    {
      path: '/',
      icon: <MdDashboard size={20} />,
      label: 'Dashboard',
      shortLabel: 'Dash'
    },
    {
      path: '/add-task',
      icon: <MdAddTask size={20} />,
      label: 'Add Task',
      shortLabel: 'Add'
    },
    {
      path: '/tasks',
      icon: <FaTasks size={18} />,
      label: 'Tasks',
      shortLabel: 'Tasks'
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden md:flex flex-col w-64
        dark:bg-gray-800 bg-gray-100 text-black dark:text-white transition-all duration-300 h-screen fixed"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-indigo-600 text-white p-2 rounded">TMD</span>
            <span className="text-xl font-semibold">TaskManager</span>
          </div>



        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3
              rounded-lg transition-colors duration-200 ${location.pathname === item.path
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              // title={isCollapsed ? item.label : ''}
            >
              <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-black dark:text-white z-50 border-t border-gray-700">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-3 w-full ${location.pathname === item.path
                ? 'bg-indigo-700 text-black dark:text-white'
                : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <span>{item.icon}</span>
              <span className="text-xs mt-1">{item.shortLabel}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}