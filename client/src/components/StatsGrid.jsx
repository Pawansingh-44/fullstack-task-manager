import { FaTasks } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { AiFillAlert } from "react-icons/ai";
function StatCard({ colorClass, icon, trend, num, label, fillPct, fillColor }) {
  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-card-top">
        <span className="stat-card-icon">{icon}</span>
        <span className="stat-card-trend">{trend}</span>
      </div>
      <p className="stat-card-num">{num}</p>
      <p className="stat-card-label">{label}</p>
      <div className="stat-card-bar">
        <div
          className="stat-card-fill"
          style={{ width: `${fillPct}%`, background: fillColor }}
        />
      </div>
    </div>
  );
}

function StatsGrid({ tasks }) {
  const total     = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active    = tasks.filter((t) => !t.completed).length;
  const overdue   = tasks.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
  ).length;

  const pct = (n) => (total === 0 ? 0 : Math.round((n / total) * 100));

  return (
    <div className="stats-grid">
      <StatCard
        colorClass="stat-purple"
        icon={<FaTasks />} trend="Total"
        num={total} label="All Tasks"
        fillPct={100} fillColor="rgba(139,92,246,0.5)"
      />
      <StatCard
        colorClass="stat-green"
        icon={<IoCheckmarkDoneCircle />} trend={`${pct(completed)}%`}
        num={completed} label="Completed"
        fillPct={pct(completed)} fillColor="rgba(74,222,128,0.5)"
      />
      <StatCard
        colorClass="stat-amber"
        icon={<MdPendingActions />} trend="Active"
        num={active} label="Active Tasks"
        fillPct={pct(active)} fillColor="rgba(251,191,36,0.5)"
      />
      <StatCard
        colorClass="stat-red"
        icon={<AiFillAlert />} trend="Urgent"
        num={overdue} label="Overdue"
        fillPct={pct(overdue)} fillColor="rgba(248,113,113,0.5)"
      />
    </div>
  );
}

export default StatsGrid;

