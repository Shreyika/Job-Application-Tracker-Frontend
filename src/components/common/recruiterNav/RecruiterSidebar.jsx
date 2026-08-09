import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { api } from "../../../api";
import { toast } from "react-toastify";

function RecruiterSidebar() {

  const { user, logout } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/userlogin", { replace: true });
  };

  const handleAddJob = async () => {

    // Make sure user exists
    if (!user?.id) {
      toast.error("User information not found.");
      return;
    }

    try {

      // Check recruiter profile directly from backend
      const response = await api.get(
        `/recruiters/user/${user.id}`
      );

      // Profile exists
      if (response.data) {
        navigate("/add-job");
      }

    } catch (error) {

      console.log("Recruiter profile check failed:", error);

      toast.warning(
        "Please complete your recruiter profile before adding a job."
      );

      navigate("/recruiter-profile");
    }
  };

  return (

    <aside className="recruiter-sidebar">

      {/* Brand */}
      <Link
        to="/recruiter-dashboard"
        className="portal-brand"
      >
        <i className="bi bi-people-fill"></i>
        Recruiter Portal
      </Link>


      {/* Navigation */}
      <nav className="portal-nav">

        {/* Dashboard */}
        <Link
          className="portal-nav-item"
          to="/recruiter-dashboard"
        >
          <i className="bi bi-grid-1x2"></i>
          Dashboard
        </Link>


        {/* Jobs */}
        <Link
          className="portal-nav-item"
          to="/recruiters/jobs"
        >
          <i className="bi bi-briefcase"></i>
          Jobs
        </Link>


        {/* Add Job */}
        <button
          type="button"
          className="portal-nav-item add-job-button"
          onClick={handleAddJob}
        >
          <i className="bi bi-plus-circle"></i>
          Add Job
        </button>


        {/* Profile */}
        <Link
          className="portal-nav-item"
          to="/recruiter-profile"
        >
          <i className="bi bi-person"></i>
          Profile
        </Link>

      </nav>


      {/* Logout */}
      <button
        className="portal-logout"
        onClick={handleLogout}
      >
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>

    </aside>
  );
}

export default RecruiterSidebar;