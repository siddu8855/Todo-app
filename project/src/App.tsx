import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './types';
import { logout } from './store/userSlice';
import Auth from './components/Auth';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { LogOut } from 'lucide-react';

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if (!user.isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        <div className="space-y-8">
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;