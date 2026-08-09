import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import "../../pages/Candidate/CandidateDashboard.css";

function CandidateLayout() {
  const { user, logout } = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/userlogin");
  };

  const navigationItems = [
    ['bi-grid-1x2', 'Dashboard', '/candidate-dashboard'],
    ['bi-person', 'Profile', `/candidate-profile/${user.id}`],
    ['bi-file-earmark-text', 'My Applications', '/candidate-applications'],
    ['bi-briefcase', 'Jobs', '/candidates/joblist'],
    ['bi-heart', 'Saved Jobs'],
    ['bi-bell', 'Alerts'],
    ['bi-envelope', 'Messages'],
    ['bi-gear', 'Settings'],
  ];

  return (
    <main className="candidate-portal">

      <aside className="candidate-sidebar">

        <Link to="/candidate-dashboard" className="portal-brand">
          <i className="bi bi-briefcase"></i>
          <span>Candidate Portal</span>
        </Link>

        <nav className="portal-nav">

          {navigationItems.map(([icon, label, path]) =>
            path ? (
              <Link
                key={label}
                to={path}
                className={`portal-nav-item ${
                  location.pathname === path ? "active" : ""
                }`}
              >
                <i className={`bi ${icon}`}></i>
                {label}
              </Link>
            ) : (
              <span key={label} className="portal-nav-item muted">
                <i className={`bi ${icon}`}></i>
                {label}
              </span>
            )
          )}

        </nav>

        <button className="portal-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>

      </aside>

      <section className="candidate-content">
        <Outlet />
      </section>

    </main>
  );
}

export default CandidateLayout;