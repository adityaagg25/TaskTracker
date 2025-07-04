import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext(undefined);

// Sample tasks for demo
const SAMPLE_TASKS = [
  {
    id: '1',
    title: 'Complete React Project',
    description: 'Finish the personal task tracker application with all required features',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2025-01-15',
    category: 'Work',
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:00:00Z',
    userId: '1'
  },
  {
    id: '2',
    title: 'Study Data Structures',
    description: 'Review linked lists, trees, and graphs for upcoming interview',
    priority: 'medium',
    status: 'pending',
    dueDate: '2025-01-20',
    category: 'Study',
    createdAt: '2025-01-01T11:00:00Z',
    updatedAt: '2025-01-01T11:00:00Z',
    userId: '1'
  },
  {
    id: '3',
    title: 'Exercise Routine',
    description: 'Morning jog and gym workout session',
    priority: 'low',
    status: 'completed',
    dueDate: '2025-01-10',
    category: 'Health',
    createdAt: '2025-01-01T09:00:00Z',
    updatedAt: '2025-01-01T09:00:00Z',
    userId: '1'
  },
  {
    id: '4',
    title: 'Plan Weekend Trip',
    description: 'Research destinations and book accommodations for the weekend getaway',
    priority: 'medium',
    status: 'pending',
    dueDate: '2025-01-25',
    category: 'Personal',
    createdAt: '2025-01-01T12:00:00Z',
    updatedAt: '2025-01-01T12:00:00Z',
    userId: '1'
  },
  {
    id: '5',
    title: 'Update Portfolio Website',
    description: 'Add new projects and update design with modern styling',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2025-01-18',
    category: 'Work',
    createdAt: '2025-01-01T13:00:00Z',
    updatedAt: '2025-01-01T13:00:00Z',
    userId: '1'
  }
];

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks.filter((task) => task.userId === user.id));
      } else {
        // Load sample tasks for demo user
        const userTasks = SAMPLE_TASKS.filter(task => task.userId === user.id);
        setTasks(userTasks);
        localStorage.setItem('tasks', JSON.stringify(SAMPLE_TASKS));
      }
    } else {
      setTasks([]);
    }
  }, [user]);

  const saveTasksToStorage = (updatedTasks) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const otherUserTasks = allTasks.filter((task) => task.userId !== user?.id);
    const newAllTasks = [...otherUserTasks, ...updatedTasks];
    localStorage.setItem('tasks', JSON.stringify(newAllTasks));
  };

  const addTask = (taskData) => {
    if (!user) return;

    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const updateTask = (id, updates) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    );
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const getFilteredTasks = (filters) => {
    let filteredTasks = [...tasks];

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }

    if (filters.priority && filters.priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }

    if (filters.category && filters.category !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.category === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTasks = filteredTasks.filter(
        task =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredTasks.sort((a, b) => {
        let aValue;
        let bValue;

        switch (filters.sortBy) {
          case 'dueDate':
            aValue = new Date(a.dueDate);
            bValue = new Date(b.dueDate);
            break;
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            aValue = priorityOrder[a.priority];
            bValue = priorityOrder[b.priority];
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          default:
            return 0;
        }

        if (filters.sortOrder === 'desc') {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      });
    }

    return filteredTasks;
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      getFilteredTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
