/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Task, TaskInput } from "@/types/task";
import { instance } from "@/utils/api";

class TaskService {
  // Fetch all tasks
  async getAllTasks(userId: number): Promise<Task[]> {
    try {
      const response = await instance.get<{ todos: Task[] }>(`/todos/user/${userId}`);
      return response.data.todos;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Fetch a single task by ID
  async getTask(id: number): Promise<Task> {
    try {
      const response = await instance.get<Task>(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create a new task
  async createTask(task: TaskInput): Promise<Task> {
    try {
      const response = await instance.post<Task>('/todos/add', task);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update an existing task
  async updateTask(id: number, task: Partial<TaskInput>): Promise<Task> {
    try {
      const response = await instance.put<Task>(`/todos/${id}`, task);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete a task
  async deleteTask(id: number): Promise<void> {
    try {
      await instance.delete(`/todos/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling
  private handleError(error: any): Error {
    if (error.response) {
      const message = error.response.data.detail || error.response.data || 'An error occurred';
      return new Error(typeof message === 'string' ? message : JSON.stringify(message));
    } else if (error.request) {
      return new Error('Please check your network connection.');
    } else {
      return new Error('Request setup error: ' + error.message);
    }
  }
}

export const TaskServiceInstance = new TaskService();