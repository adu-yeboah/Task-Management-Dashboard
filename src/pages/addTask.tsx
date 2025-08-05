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
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useAddTask } from '@/hooks/useTask';
import { FaPlus } from 'react-icons/fa';

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

export default function AddTaskPage() {
  const navigate = useNavigate();
  const addTask = useAddTask();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      todo: "",
      description: "",
      status: "todo",
    },
  });

  async function onSubmit(data: TaskFormValues) {
    try {
      await addTask.mutateAsync(data);
      toast.success(`Task "${data.todo}" created successfully!`);
      navigate('/tasks');
    } catch (error) {
      console.log(error);
      toast.error('Failed to create task');
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-2xl">
      {/* Header with responsive spacing */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">Add New Task</h1>
      </div>

      {/* Form container with responsive padding */}
      <div className="space-y-4 sm:space-y-6 bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-md">
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Fill out the form below to create a new task.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="todo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base dark:text-gray-300">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task title"
                      {...field}
                      className="text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base dark:text-gray-300">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter task description (optional)"
                      {...field}
                      className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Status Field */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base dark:text-gray-300">Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select task status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="todo" className="dark:hover:bg-gray-600">To Do</SelectItem>
                      <SelectItem value="in-progress" className="dark:hover:bg-gray-600">In Progress</SelectItem>
                      <SelectItem value="done" className="dark:hover:bg-gray-600">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Buttons with responsive layout */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-3 sm:pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/tasks')}
                disabled={addTask.isPending}
                className="w-full sm:w-auto dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addTask.isPending}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {addTask.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FaPlus className="mr-2 text-sm sm:text-base" />
                    Add Task
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}