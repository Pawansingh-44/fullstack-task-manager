const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard", id: "dashboard" },
  { icon: "✓", label: "My Tasks",  id: "tasks"     },
  { icon: "📅", label: "Calendar",  id: "calendar"  },
  { icon: "📊", label: "Analytics", id: "analytics" },
  { icon: "⚙️", label: "Settings",  id: "settings"  },
];

function Sidebar({ activeNav, onNavChange, tasks }) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPct =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">TM</div>
        <span className="logo-text">TaskFlow</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeNav === item.id ? "nav-active" : ""}`}
            onClick={() => onNavChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-progress-card">
        <p className="sp-title">Overall Progress</p>
        <p className="sp-pct">{progressPct}%</p>
        <div className="sp-track">
          <div className="sp-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="sp-sub">
          {completedCount} of {tasks.length} tasks done
        </p>
      </div>

      <div className="sidebar-footer">
        <div className="avatar-wrap">
          <div className="avatar">P</div>
          <div>
            <p className="avatar-name">Pawan</p>
            <p className="avatar-role">Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

