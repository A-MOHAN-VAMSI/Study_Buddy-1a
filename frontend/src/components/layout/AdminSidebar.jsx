import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Create Exam",
    path: "/admin/create-exam",
    icon: BookOpen,
  },
  {
    title: "Students",
    path: "/admin/students",
    icon: Users,
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <aside className="sb-sidebar">
      <div>
        <h2
          style={{
            color: "white",
            marginBottom: "2rem",
            fontWeight: 700,
          }}
        >
          Admin Portal
        </h2>

        <nav className="sb-nav">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "sb-nav-item active"
                    : "sb-nav-item"
                }
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sb-user">
        <div>
          <strong>{user.name}</strong>
          <p>Administrator</p>
        </div>

        <button
          className="sb-logout"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}