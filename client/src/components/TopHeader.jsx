const PAGE_TITLES = {
  dashboard: "Dashboard",
  tasks:     "My Tasks",
  calendar:  "Calendar",
  analytics: "Analytics",
  settings:  "Settings",
};

function TopHeader({ activeNav, searchQuery, onSearchChange, onAddTask }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  });

  return (
    <header className="top-header">
      <div className="header-left">
        <h1 className="header-title">{PAGE_TITLES[activeNav] || "Dashboard"}</h1>
        <p className="header-date">{today}</p>
      </div>
      <div className="header-right">
        <div className="search-box">
          <span className="search-ico">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-field"
          />
        </div>
        <button className="add-btn" onClick={onAddTask}>
          + New Task
        </button>
      </div>
    </header>
  );
}

export default TopHeader;

