import React from 'react';
import { useTask } from '../context/TaskContext';
import { Calendar, Clock, Edit3, Trash2, CheckCircle, Circle, PlayCircle } from 'lucide-react';

export default function TaskCard({ task, onEdit }) {
  const { updateTask, deleteTask } = useTask();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'in-progress':
        return <PlayCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';
    }
  };

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();
  const dueDate = new Date(task.dueDate);
  const createdAt = new Date(task.createdAt);
  const today = new Date();
  const daysDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md w-full max-w-full overflow-x-auto ${
      isOverdue ? 'border-red-200 bg-red-50/30 dark:border-red-700 dark:bg-red-950/30' : 'border-gray-100 hover:border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600'
    }`}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1 min-w-0 w-full">
            <button
              onClick={() => {
                const newStatus = task.status === 'completed'
                  ? 'pending'
                  : task.status === 'pending'
                    ? 'in-progress'
                    : 'completed';
                handleStatusChange(newStatus);
              }}
              className="mt-1 hover:scale-110 transition-transform"
            >
              {getStatusIcon(task.status)}
            </button>

            <div className="flex-1 min-w-0 w-full">
              {/* Title row with actions on mobile */}
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold mb-2 ${
                  task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                }`}>
                  {task.title}
                </h3>
                {/* Show actions here on mobile only */}
                <div className="flex items-center space-x-2 sm:hidden ml-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:hover:bg-gray-700 dark:hover:text-blue-400"
                    title="Edit task"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-gray-700 dark:hover:text-red-400"
                    title="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {task.description && (
                <p className={`text-sm mb-3 ${
                  task.status === 'completed' ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                  {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>

                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>

                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700">
                  {task.category}
                </span>
              </div>

              <div className="flex items-center gap-x-2 flex text-sm text-gray-500 dark:text-gray-400">
                <div className={`flex items-center ${isOverdue ? 'text-red-600 dark:text-red-400' : ''}`}>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="font-medium">
                    {dueDate.toLocaleDateString()}
                  </span>
                  
                </div>

                {task.status !== 'completed' && (
                  <div className={`flex items-center ${
                    daysDiff <= 1 ? 'text-red-600 dark:text-red-400' : daysDiff <= 3 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {isOverdue
                        ? `${Math.abs(daysDiff)} day${Math.abs(daysDiff) !== 1 ? 's' : ''} overdue`
                        : daysDiff === 0
                          ? 'Due today'
                          : daysDiff === 1
                            ? 'Due tomorrow'
                            : `${daysDiff} days left`
                      }
                    </span>
                  </div>
                )}
                <div className="flex-1"></div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 justify-end">
                  <span className="mr-1">Created:</span>
                  {/* <Calendar className="h-3 w-3 mr-1" /> */}
                  <span>{createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 ml-0 sm:ml-4 mt-2 sm:mt-0">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:hover:bg-gray-700 dark:hover:text-blue-400"
              title="Edit task"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-gray-700 dark:hover:text-red-400"
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
