import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { Filter, Search } from 'lucide-react';
import TaskFilters from './TaskFilters';

export default function TaskList({ tasks, filters, onFiltersChange }) {
  const [editingTask, setEditingTask] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCloseEdit = () => {
    setEditingTask(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center dark:bg-gray-800 dark:border-gray-700">
        <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">No tasks found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your filters or create a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 px-2 sm:px-0">
        {/* Row: Heading + Filters button (mobile only) */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Tasks ({tasks.length})
          </h2>
          {/* Mobile filter button */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            {showMobileFilters && (
              <div className="absolute z-50 left-0 right-0 mt-2 px-4">
                <div className="relative">
                  <TaskFilters
                    filters={filters}
                    onFiltersChange={(newFilters) => {
                      onFiltersChange(newFilters);
                      setShowMobileFilters(false);
                    }}
                    isMobile
                  />
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      </div>

      {editingTask && (
        <TaskForm
          isOpen={!!editingTask}
          onClose={handleCloseEdit}
          task={editingTask}
        />
      )}
    </>
  );
}
