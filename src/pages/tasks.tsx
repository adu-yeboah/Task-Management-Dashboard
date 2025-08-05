import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDeleteTask, useTasks } from '@/hooks/useTask';
import { resetFilters, setSearchQuery, setStatusFilter } from '@/redux/filterSlice';
import { Pencil, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

export default function Tasks() {
  const dispatch = useDispatch();
  const { status, searchQuery } = useSelector((state: { filter: { status: string; searchQuery: string } }) => state.filter);
  const { data: tasks, isLoading, isError } = useTasks({ 
    status: status !== 'all' ? status : undefined,
    search: searchQuery,
  });
  const deleteTask = useDeleteTask();

  const handleStatusChange = (value: "all" | "todo" | "in-progress" | "done") => {
    dispatch(setStatusFilter(value));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with icon matching sidebar */}
        <div className="flex justify-between items-center mb-8">
         
          <Link to="/add-task">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Add New Task
            </Button>
          </Link>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="md:w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex gap-2">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                <SelectItem value="all" className="dark:hover:bg-gray-600">All Tasks</SelectItem>
                <SelectItem value="todo" className="dark:hover:bg-gray-600">To Do</SelectItem>
                <SelectItem value="in-progress" className="dark:hover:bg-gray-600">In Progress</SelectItem>
                <SelectItem value="done" className="dark:hover:bg-gray-600">Done</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => dispatch(resetFilters())}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Task table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        ) : isError ? (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
            Failed to load tasks. Please try again later.
          </div>
        ) : (
          <div className="rounded-lg border dark:border-gray-700 overflow-hidden">
            <Table className="dark:bg-gray-800">
              <TableHeader className="dark:bg-gray-700">
                <TableRow>
                  <TableHead className="dark:text-gray-300">ID</TableHead>
                  <TableHead className="dark:text-gray-300">Title</TableHead>
                  <TableHead className="dark:text-gray-300">Description</TableHead>
                  <TableHead className="dark:text-gray-300">Status</TableHead>
                  <TableHead className="dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks?.map((task) => (
                  <TableRow key={task.id} className="dark:border-gray-700">
                    <TableCell className="dark:text-gray-300">{task.id}</TableCell>
                    <TableCell className="dark:text-gray-300">{task.todo}</TableCell>
                    <TableCell className="dark:text-gray-300">{task.description || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.status === 'done' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        task.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                      }`}>
                        {task.status === 'done' ? 'Done' : 
                         task.status === 'in-progress' ? 'In Progress' : 'To Do'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/tasks/${task.id}`}>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteTask.mutate(task.id)}
                          disabled={deleteTask.isPending}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        >
                          <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}