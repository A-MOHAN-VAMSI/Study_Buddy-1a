import { Search, Bell, Settings, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleSettings = () => {
  if (user.role === "admin") {
    navigate("/admin/settings");
  } else {
    navigate("/settings");
  }
};

const pageInfo = () => {

  if (location.pathname === "/")
    return {
      title: "Dashboard",
      subtitle: `Welcome back, ${user.name || "Student"}`
    };

  if (location.pathname.startsWith("/take-exam"))
    return {
      title: "Examination",
      subtitle: "Answer carefully before submitting."
    };

  if (location.pathname.startsWith("/results"))
    return {
      title: "Exam Results",
      subtitle: "Review your performance."
    };

  if (location.pathname === "/admin")
    return {
      title: "Faculty Admin Portal",
      subtitle: "Create exams, monitor analytics and manage students."
    };

  if (location.pathname === "/admin/create-exam")
    return {
      title: "Create Examination",
      subtitle: "Build and publish a new examination."
    };

  return {
    title: "StudyBuddy",
    subtitle: "AI Powered Examination Portal"
  };
};

const page = pageInfo();

  return (
    <header className="sb-navbar">

      <div className="sb-navbar-left">

        <h1 className="sb-page-title">
  {page.title}
</h1>

<p className="sb-page-subtitle">
  {page.subtitle}
</p>

      </div>

      <div className="sb-navbar-right">

        <div className="sb-search">

          <Search size={18} />

          <input
            placeholder="Search..."
          />

        </div>

        <button className="sb-icon-btn">
          <Bell size={20}/>
        </button>

       <button
  className="sb-icon-btn"
  onClick={() => navigate("/settings")}
>
  <Settings size={20} />
</button>

        <div className="sb-profile">

          <div className="sb-avatar">
            <User size={18}/>
          </div>

          <div>

            <strong>{user.name || "Guest"}</strong>

            <p>{user.role || "Student"}</p>

          </div>

        </div>

      </div>

    </header>
  );
}