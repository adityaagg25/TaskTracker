import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import Header from './Header';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import TaskStats from './TaskStats';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { getFilteredTasks } = useTask();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: '',
    sortBy: 'dueDate',
    sortOrder: 'asc'
  });

  const filteredTasks = getFilteredTasks(filters);

  const handleFiltersChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-gray-600 mt-1 dark:text-gray-300">
                Manage Your Tasks and Stay Productive
              </p>
            </div>
            {/* Desktop button */}
<button
  onClick={() => setIsFormOpen(true)}
  className="hidden sm:inline-flex items-center justify-center w-auto h-auto px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
>
  <Plus className="h-5 w-5" />
  <span className="ml-2">Add New Task</span>
</button>

{/* Mobile floating button */}
<button
  onClick={() => setIsFormOpen(true)}
  className="fixed bottom-5 right-5 z-50 sm:hidden w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
>
  <Plus className="h-6 w-6" />
</button>

          </div>
        </div>

        <TaskStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TaskFilters filters={filters} onFiltersChange={handleFiltersChange} />
          </div>

          <div className="lg:col-span-3">
            <TaskList
              tasks={filteredTasks}
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </div>
      </main>

      {isFormOpen && (
        <TaskForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
