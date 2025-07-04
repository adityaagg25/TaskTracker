import React from 'react';
import { useTask } from '../context/TaskContext';
import { Clock, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react';

export default function TaskStats() {
  const { tasks } = useTask();

  const stats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    overdue: tasks.filter(task =>
      task.status !== 'completed' && new Date(task.dueDate) < new Date()
    ).length
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: BarChart3,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      textColor: 'text-blue-700 dark:text-blue-300'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      textColor: 'text-yellow-700 dark:text-yellow-300'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      textColor: 'text-orange-700 dark:text-orange-300'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
      textColor: 'text-green-700 dark:text-green-300'
    }
  ];

  return (
    <div className="mb-5">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className={`${stat.bgColor} rounded-xl p-3 border border-gray-100 shadow-sm dark:border-gray-700`}>
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-medium font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {stats.total > 0 && (
        <div className="mt-5 bg-white rounded-xl p-5 border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress Overview</h3>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2 dark:text-gray-400">
            <span>{stats.completed} completed</span>
            <span>{stats.total - stats.completed} remaining</span>
          </div>
          {stats.overdue > 0 && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950 dark:border-red-700">
              <p className="text-sm text-red-700 font-medium dark:text-red-300">
                ⚠️ You have {stats.overdue} overdue task{stats.overdue !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
