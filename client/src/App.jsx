import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar      from "./components/Sidebar";
import TopHeader    from "./components/TopHeader";
import StatsGrid    from "./components/StatsGrid";
import TaskList     from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";
import EditModal    from "./components/EditModal";
import DeleteModal  from "./components/DeleteModal";

import "./App.css";

const PAGE_VIEWS = {
  dashboard: { icon: "⊞", title: "Dashboard",  sub: "Switch to 'My Tasks' from the sidebar to manage your tasks." },
  calendar:  { icon: "📅", title: "Calendar",   sub: "Calendar view is coming soon. You can set due dates on tasks from My Tasks." },
  analytics: { icon: "📊", title: "Analytics",  sub: "Analytics & reporting features are coming soon." },
  settings:  { icon: "⚙️", title: "Settings",   sub: "Settings panel is coming soon — themes, notifications, and more." },
};

function App() {
  const [tasks,        setTasks]        = useState([]);
  const [filter,       setFilter]       = useState("all");
  const [searchQuery,  setSearchQuery]  = useState("");
  const [activeNav,    setActiveNav]    = useState("tasks");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget,   setEditTarget]   = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // ── API helpers ──────────────────────────────────────────
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  const fetchTasks = async () => {
  try {
    setError("");

    const res = await axios.get("https://fullstack-task-manager-api.onrender.com/tasks");

    setTasks(res.data);
  } catch (err) {
    console.error(err);
    setError("Failed to load tasks. Please try again.");
  } finally {
  }
};

 useEffect(() => {
  const loadTasks = async () => {
    try {
      setLoading(true);
      await fetchTasks();
    } finally {
      setLoading(false);
    }
  };

  loadTasks();
}, []);

  const handleAddConfirm = async ({ title, description, dueDate }) => {
    await axios.post("https://fullstack-task-manager-api.onrender.com/tasks", {
      id: Date.now(), title, description, dueDate, completed: false,
    });
    setShowAddModal(false);
    fetchTasks();
  };

  const handleEditConfirm = async ({ title, description, dueDate }) => {
    await axios.put(`https://fullstack-task-manager-api.onrender.com/tasks/${editTarget.id}`, {
      ...editTarget, title, description, dueDate,
    });
    setEditTarget(null);
    fetchTasks();
  };

  const handleDeleteConfirm = async () => {
    await axios.delete(`https://fullstack-task-manager-api.onrender.com/tasks/${deleteTarget.id}`);
    setDeleteTarget(null);
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await axios.patch(`https://fullstack-task-manager-api.onrender.com/tasks/${id}`);
    fetchTasks();
  };

  // ── Filtered tasks (search applied here for TaskList) ────
  const visibleTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // ── Render ───────────────────────────────────────────────
  if (loading) {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading tasks...</p>
    </div>
  );
}

if (error) {
  return (
    <div className="error-screen">
      <h2>⚠️ Something went wrong</h2>
      <p>{error}</p>

      <button onClick={fetchTasks}>
        Retry
      </button>
    </div>
  );
}
  return (
    <div className="dashboard">
      {/* Modals */}
      {showAddModal  && <AddTaskModal  onConfirm={handleAddConfirm}    onCancel={() => setShowAddModal(false)} />}
      {editTarget    && <EditModal     task={editTarget} onConfirm={handleEditConfirm}   onCancel={() => setEditTarget(null)} />}
      {deleteTarget  && <DeleteModal   taskTitle={deleteTarget.title}  onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)} />}

      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        tasks={tasks}
      />

      {/* Main */}
      <div className="main-area">
        <TopHeader
          activeNav={activeNav}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddTask={() => setShowAddModal(true)}
        />

        {/* Non-task pages */}
        {activeNav !== "tasks" && PAGE_VIEWS[activeNav] && (
          <div className="page-view">
            <div className="page-view-icon">{PAGE_VIEWS[activeNav].icon}</div>
            <p className="page-view-title">{PAGE_VIEWS[activeNav].title}</p>
            <p className="page-view-sub">{PAGE_VIEWS[activeNav].sub}</p>
          </div>
        )}

        {/* Tasks page */}
        {activeNav === "tasks" && (
          <>
            <StatsGrid tasks={tasks} />

            <div className="content-card">
              <div className="content-card-header">
                <div>
                  <h2 className="content-card-title">My Tasks</h2>
                  <p className="content-card-sub">{visibleTasks.length} tasks</p>
                </div>
                <div className="filter-pills">
                  {["all", "active", "completed"].map((f) => (
                    <button
                      key={f}
                      className={`filter-pill ${filter === f ? "filter-pill-active" : ""}`}
                      onClick={() => setFilter(f)}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <TaskList
                tasks={visibleTasks}
                filter={filter}
                onToggle={handleToggle}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

