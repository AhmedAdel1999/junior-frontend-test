import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask, toggleTask } from '../redux/tasksSlice';

const PRIORITIES = ['High', 'Medium', 'Low'];

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    if (!title.trim()) return;
    dispatch(editTask({ id: task.id, title: title.trim(), priority }));
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setPriority(task.priority);
    setEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        {editing ? (
          <div className="edit-row">
            <input
              className="form-input edit-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        ) : (
          <div className="task-info">
            <span className="task-title">{task.title}</span>
            <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </div>
        )}
      </div>
      <div className="task-actions">
        {editing ? (
          <>
            <button className="btn btn-save" onClick={handleSave}>Save</button>
            <button className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn btn-edit" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-delete" onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
