import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";

function AdminSidebar() {

  const { user, logout } = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/userlogin", { replace: true });
  };

  const navigationItems = [
    {
      icon: "bi-grid-1x2",
      label: "Dashboard",
      path: "/admin-dashboard"
    },
    {
      icon: "bi-people",
      label: "Users",
      path: "/admin/users"
    },
    {
      icon: "bi-person-workspace",
      label: "Recruiters",
      path: "/admin/recruiters"
    },
    {
      icon: "bi-person",
      label: "Candidates",
      path: "/admin/candidates"
    },
    {
      icon: "bi-briefcase",
      label: "Jobs",
      path: "/admin/jobs"
    },
    {
      icon: "bi-file-earmark-text",
      label: "Applications",
      path: "/admin/applications"
    },
    {
      icon: "bi-bar-chart",
      label: "Reports",
      path: "/admin/reports"
    },
    {
      icon: "bi-gear",
      label: "Settings",
      path: "/admin/settings"
    }
  ];

  const isActive = (path) => {
    if (path === "/admin-dashboard") {
      return location.pathname === "/admin-dashboard";
    }

    return location.pathname.startsWith(path);
  };

  const firstName = user?.firstName?.trim() || "";
  const lastName = user?.lastName?.trim() || "";

  const adminName =
    `${firstName} ${lastName}`.trim() ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Admin";

  const initials = (
    firstName.charAt(0) ||
    adminName.charAt(0)
  ).toUpperCase();

  return (

    <aside className="admin-sidebar">

      {/* Logo */}
      <Link
        to="/admin-dashboard"
        className="admin-brand"
      >
        <span className="admin-brand-icon">
          <i className="bi bi-shield-check"></i>
        </span>

        <span>Admin Portal</span>
      </Link>


      {/* Navigation */}
      <nav className="admin-nav">

        {navigationItems.map((item) => (

          <Link
            key={item.label}
            to={item.path}
            className={`admin-nav-item ${
              isActive(item.path) ? "active" : ""
            }`}
          >

            <i className={`bi ${item.icon}`}></i>

            <span>{item.label}</span>

          </Link>

        ))}

      </nav>


      {/* Admin Profile */}
      <div className="admin-sidebar-profile">

        <div className="admin-avatar">
          {initials}
        </div>

        <div className="admin-profile-info">

          <strong>{adminName}</strong>

          <small>Administrator</small>

        </div>

      </div>


      {/* Logout */}
      <button
        className="admin-logout"
        onClick={handleLogout}
      >

        <i className="bi bi-box-arrow-right"></i>

        <span>Logout</span>

      </button>

    </aside>
  );
}

export default AdminSidebar;