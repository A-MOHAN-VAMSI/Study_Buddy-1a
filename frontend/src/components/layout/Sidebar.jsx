import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

const studentLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Exams",
    icon: BookOpen,
    path: "/exams",
  },
  {
    title: "Results",
    icon: ClipboardList,
    path: "/results",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const adminLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Create Exam",
    icon: BookOpen,
    path: "/admin/create-exam",
  },
  {
    title: "Manage Exams",
    icon: ClipboardList,
    path: "/admin",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const links =
  user.role === "admin"
    ? adminLinks
    : studentLinks;

  return (
    <aside className="sb-sidebar">

      <div>

        <div className="sb-logo">

          <div className="sb-logo-icon">
            <GraduationCap size={28} />
          </div>

          <div>
            <h2>StudyBuddy</h2>
            <p>
  {user.role === "admin"
    ? "Faculty Portal"
    : "AI Examination"}
</p>
          </div>

        </div>

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
                <Icon size={20} />

                <span>{item.title}</span>

              </NavLink>
            );
          })}

        </nav>

      </div>

      <div className="sb-user">

        <div>

          <strong>{user.name || "Guest"}</strong>

          <p>
  {user.role === "admin"
    ? "Administrator"
    : "Student"}
</p>

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