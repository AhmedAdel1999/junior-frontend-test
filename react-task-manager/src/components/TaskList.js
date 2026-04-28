import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks, filter } = useSelector((state) => state.tasks);

  const filtered = filter === 'All'
    ? tasks
    : tasks.filter((t) => t.priority === filter);

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">✓</span>
        <p>{filter === 'All' ? 'No tasks yet. Add one above!' : `No ${filter} priority tasks.`}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filtered.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
