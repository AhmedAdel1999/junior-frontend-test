import { Provider } from 'react-redux';
import store from './redux/store';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-wrapper">
        <header className="app-header">
          <h1 className="app-title">
            <span className="title-accent">Task</span>Flow
          </h1>
          <p className="app-subtitle">Manage your work with clarity</p>
        </header>
        <main className="app-main">
          <TaskForm />
          <FilterBar />
          <TaskList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
