import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/tasksSlice';

const FILTERS = ['All', 'High', 'Medium', 'Low'];

export default function FilterBar() {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.tasks.filter);

  return (
    <div className="filter-bar">
      <span className="filter-label">Filter by priority:</span>
      <div className="filter-buttons">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`btn filter-btn ${current === f ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(f))}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
