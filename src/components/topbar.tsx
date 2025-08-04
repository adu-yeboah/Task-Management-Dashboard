import { FiSun, FiMoon } from 'react-icons/fi';

export default function Topbar() {
  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      html.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <header className="fixed top-0 right-0 left-64 z-50 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 p-3 flex justify-end">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 mr-4 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            <FiSun className="hidden dark:block" size={20} />
            <FiMoon className="dark:hidden" size={20} />
          </button>
    </header>
  );
}