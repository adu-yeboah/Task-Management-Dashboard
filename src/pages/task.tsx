import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { useTasks, useUpdateTask } from '@/hooks/useTask';
import { FaCheck } from 'react-icons/fa';
import { IoCloseSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const taskFormSchema = z.object({
  todo: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().max(200, {
    message: "Description must not exceed 200 characters.",
  }).optional(),
  status: z.enum(["todo", "in-progress", "done"]),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export default function EditTaskPage() {
  const { id } = useParams();
  const { data: tasks } = useTasks();
  const updateTask = useUpdateTask();
  const [isEditing, setIsEditing] = useState(false);

  const task = tasks?.find(t => t.id === Number(id));

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      todo: task?.todo || '',
      description: task?.description || '',
      status: task?.status || 'todo',
    },
  });

  const handleCancelEdit = () => {
    form.reset({
      todo: task?.todo || '',
      description: task?.description || '',
      status: task?.status || 'todo',
    });
    setIsEditing(false);
  };

  async function onSubmit(data: TaskFormValues) {
    if (!task) return;

    try {
      await updateTask.mutateAsync({
        id: task.id,
        ...data,
        completed: false,
        userId: 0
      });
      toast.success(`Task "${data.todo}" updated successfully!`);
      setIsEditing(false);
    } catch (error) {
      console.log(error)
      toast.error('Failed to update task');
    }
  }

  if (!task) {
    return (
      <div className="container mx-auto px-4 py-8 dark:text-white">
        <p>Task not found</p>
      </div>
    );
  }

  const statusBadgeClass = {
    'todo': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    'done': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-2xl mt-10">
        {/* Header with icon matching sidebar */}
        <div className="flex justify-between items-center mb-6 ">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">
              {isEditing ? 'Edit Task' : 'Task Details'}
            </h1>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <MdEdit className="mr-2" />
              Edit Task
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <IoCloseSharp className="mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                form="task-form"
                disabled={updateTask.isPending}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {updateTask.isPending ? (
                  <>
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6 bg-gray-100 dark:bg-gray-800 p-10 rounded-md">
          {isEditing ? (
            <Form {...form}>
              <form
                id="task-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="todo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter task title"
                          {...field}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter task description (optional)"
                          {...field}
                          className="min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <SelectValue placeholder="Select task status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                          <SelectItem value="todo" className="dark:hover:bg-gray-600">To Do</SelectItem>
                          <SelectItem value="in-progress" className="dark:hover:bg-gray-600">In Progress</SelectItem>
                          <SelectItem value="done" className="dark:hover:bg-gray-600">Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <div className="space-y-4 dark:text-white">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{task.todo}</h2>
                <span className={`px-2 py-1 rounded-full text-sm ${statusBadgeClass[task.status || 'todo']}`}>
                  {task.status === 'done' ? 'Done' :
                    task.status === 'in-progress' ? 'In Progress' : 'To Do'}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {task.description || 'No description provided'}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-medium">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

         
        </div>
      </div>
    </div>
  );
}