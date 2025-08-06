export type Task = {
  id: number;
  todo: string;
  completed?: boolean;
  userId?: number;
};

export interface TaskInput {
  todo: string;
  completed?: boolean;
  userId?: number;
}
