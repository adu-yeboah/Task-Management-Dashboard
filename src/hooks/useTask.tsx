/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task, TaskInput } from '@/types/task';
import { TaskServiceInstance } from '@/service/taskService';
import { useAuth } from './useAuth';

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type ExtendedTask = Task & {
    status?: TaskStatus;
    description?: string;
};


// Helper function to transform tasks to our extended format
const transformTasks = (tasks: ExtendedTask[]): ExtendedTask[] => {
    return tasks.map(task => ({
        ...task,
        status: task.completed ? 'done' : Math.random() > 0.5 ? 'in-progress' : 'todo',
        description: task.description || `Description for task ${task.id}`,
    }));
};

export const useTasks = (filter?: { status?: string; search?: string }) => {
    const { auth } = useAuth()
    return useQuery<ExtendedTask[]>({
        queryKey: ['tasks', filter],
        queryFn: async () => {
            if (!auth.user?.id) {
                throw new Error('User ID is required to fetch tasks.');
            }
            const tasks = await TaskServiceInstance.getAllTasks(auth.user.id);
            let extendedTasks = transformTasks(tasks);

            if (filter?.status && filter.status !== 'all') {
                extendedTasks = extendedTasks.filter(task => task.status === filter.status);
            }

            if (filter?.search) {
                extendedTasks = extendedTasks.filter(task =>
                    task.todo.toLowerCase().includes((filter.search ?? '').toLowerCase()) ||
                    (task.description && task.description.toLowerCase().includes((filter.search ?? '').toLowerCase()))
                )
            }

            return extendedTasks;
        },
    });
};

export const useAddTask = () => {
    const { auth } = useAuth()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTask: Omit<ExtendedTask, 'id'>) => {
            const taskInput: TaskInput = {
                todo: newTask.todo,
                completed: newTask.status === 'done',
                userId: auth.user && auth?.user.id as any,
            };
            const createdTask = await TaskServiceInstance.createTask(taskInput);
            return {
                ...createdTask,
                status: newTask.status,
                description: newTask.description,
            };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedTask: ExtendedTask) => {
            const taskUpdate: Partial<TaskInput> = {
                todo: updatedTask.todo,
                completed: updatedTask.status === 'done',
            };
            const updated = await TaskServiceInstance.updateTask(updatedTask.id, taskUpdate);
            return {
                ...updated,
                status: updatedTask.status,
                description: updatedTask.description,
            };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (taskId: number) => {
            await TaskServiceInstance.deleteTask(taskId);
            return taskId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};