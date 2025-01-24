export interface Todo {
  id: string;
  text: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  weather?: {
    temp: number;
    condition: string;
  };
}

export interface User {
  email: string;
  isAuthenticated: boolean;
}

export interface RootState {
  todos: Todo[];
  user: User;
}