import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from '../store/todosSlice';
import { RootState } from '../types';
import { Trash2, CheckCircle, XCircle, Cloud } from 'lucide-react';

const TaskList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`flex items-center justify-between p-4 bg-white rounded-lg shadow ${
            todo.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTodo(todo.id))}
              className="focus:outline-none"
            >
              {todo.completed ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-gray-400" />
              )}
            </button>
            <div>
              <p
                className={`text-lg ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </p>
              <span
                className={`text-sm font-medium ${getPriorityColor(
                  todo.priority
                )}`}
              >
                {todo.priority}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {todo.weather && (
              <div className="flex items-center text-gray-600">
                <Cloud className="h-5 w-5 mr-1" />
                <span>{todo.weather.temp}°C</span>
              </div>
            )}
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;