import { Link } from 'react-router';
import { MdTask } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { useTasks } from '@/hooks/useTask';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { data: tasks } = useTasks();
  const { auth } = useAuth();
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(task => task.status === 'done').length || 0;
  const pendingTasks = totalTasks - completedTasks;
  const recentTasks = tasks?.slice(0, 5) || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">Welcome, {auth.user?.firstName}</h1>
        </div>

        {/* Summary Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Tasks Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Total Tasks</p>
                <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">{totalTasks}</h2>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <FaTasks className="text-indigo-600 dark:text-indigo-400 text-xl sm:text-2xl" />
              </div>
            </div>
            <Link to="/tasks" className="text-sm sm:text-base text-indigo-600 dark:text-indigo-400 hover:underline mt-2 sm:mt-4 inline-block">
              View all tasks
            </Link>
          </div>

          {/* Completed Tasks Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Completed</p>
                <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">{completedTasks}</h2>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <MdTask className="text-green-600 dark:text-green-400 text-xl sm:text-2xl" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
              {totalTasks > 0 ? `${Math.round((completedTasks / totalTasks) * 100)}% completion` : 'No tasks yet'}
            </p>
          </div>

          {/* Pending Tasks Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Pending</p>
                <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">{pendingTasks}</h2>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <MdTask className="text-yellow-600 dark:text-yellow-400 text-xl sm:text-2xl" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
              {totalTasks > 0 ? `${Math.round((pendingTasks / totalTasks) * 100)}% remaining` : 'No tasks yet'}
            </p>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 sm:p-6 border-b dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold dark:text-white">Recent Tasks</h2>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <div key={task.id} className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium dark:text-white truncate">{task.todo}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {task.description || 'No description'}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-2 py-1 rounded-full text-xs ${task.status === 'done' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        task.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                          'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        }`}>
                        {task.status === 'done' ? 'Done' :
                          task.status === 'in-progress' ? 'In Progress' : 'To Do'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 sm:p-6 text-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
                No recent tasks found
              </div>
            )}
          </div>
          <div className="p-3 sm:p-4 border-t dark:border-gray-700 text-center">
            <Link
              to="/tasks"
              className="text-sm sm:text-base text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View all tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}