import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch {}
};

const initialState = {
  tasks: loadFromStorage(),
  filter: 'All',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        id: uuidv4(),
        title: action.payload.title,
        priority: action.payload.priority,
        completed: false,
      };
      state.tasks.unshift(task);
      saveToStorage(state.tasks);
    },
    editTask: (state, action) => {
      const { id, title, priority } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.title = title;
        task.priority = priority;
        saveToStorage(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveToStorage(state.tasks);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToStorage(state.tasks);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
