import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../../context/LoginContext";
import './AdminDashboard.css';

function AdminDashboard() {

  const { user } = useContext(LoginContext);

  const firstName =
    user?.firstName?.trim() ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Admin";


  return (

    <div className="admin-dashboard">

      {/* Header */}

      <header className="admin-dashboard-header">

        <div>

          <h1>
            Welcome, {firstName}!
          </h1>

          <p>
            Here's what's happening with your JobTrack platform.
          </p>

        </div>

        <div className="admin-header-actions">

          <button className="admin-notification">

            <i className="bi bi-bell"></i>

            <span>3</span>

          </button>

        </div>

      </header>


      {/* Statistics */}

      <section className="admin-metrics">

        <article className="admin-metric-card">

          <div className="admin-metric-icon blue">
            <i className="bi bi-people-fill"></i>
          </div>

          <div>

            <span>Total Users</span>

            <strong>1,245</strong>

            <small>
              <i className="bi bi-arrow-up"></i>
              12% this month
            </small>

          </div>

        </article>


        <article className="admin-metric-card">

          <div className="admin-metric-icon green">
            <i className="bi bi-person-workspace"></i>
          </div>

          <div>

            <span>Recruiters</span>

            <strong>245</strong>

            <small>
              <i className="bi bi-arrow-up"></i>
              8% this month
            </small>

          </div>

        </article>


        <article className="admin-metric-card">

          <div className="admin-metric-icon purple">
            <i className="bi bi-person-fill"></i>
          </div>

          <div>

            <span>Candidates</span>

            <strong>1,000</strong>

            <small>
              <i className="bi bi-arrow-up"></i>
              15% this month
            </small>

          </div>

        </article>


        <article className="admin-metric-card">

          <div className="admin-metric-icon orange">
            <i className="bi bi-briefcase-fill"></i>
          </div>

          <div>

            <span>Active Jobs</span>

            <strong>128</strong>

            <small>
              <i className="bi bi-arrow-up"></i>
              6% this month
            </small>

          </div>

        </article>

      </section>


      {/* Main Grid */}

      <section className="admin-dashboard-grid">


        {/* Platform Overview */}

        <article className="admin-card admin-overview-card">

          <div className="admin-card-header">

            <div>

              <h2>Platform Overview</h2>

              <p>
                JobTrack activity overview
              </p>

            </div>

            <button>
              Last 7 days
              <i className="bi bi-chevron-down"></i>
            </button>

          </div>


          <div className="admin-chart">

            <div className="chart-y-axis">

              <span>1000</span>
              <span>750</span>
              <span>500</span>
              <span>250</span>
              <span>0</span>

            </div>


            <div className="chart-area">

              <div className="chart-line line-one"></div>

              <div className="chart-line line-two"></div>

              <div className="chart-line line-three"></div>

              <div className="chart-line line-four"></div>

              <div className="chart-data">

                <span style={{ height: "45%" }}></span>
                <span style={{ height: "62%" }}></span>
                <span style={{ height: "55%" }}></span>
                <span style={{ height: "78%" }}></span>
                <span style={{ height: "70%" }}></span>
                <span style={{ height: "88%" }}></span>
                <span style={{ height: "82%" }}></span>

              </div>

              <div className="chart-days">

                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>

              </div>

            </div>

          </div>

        </article>


        {/* Quick Actions */}

        <article className="admin-card admin-quick-card">

          <div className="admin-card-title">

            <h2>Quick Actions</h2>

          </div>


          <div className="admin-quick-actions">

            <Link to="/admin/users">

              <span>
                <i className="bi bi-people"></i>
              </span>

              <div>
                <strong>Manage Users</strong>
                <small>View all users</small>
              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>


            <Link to="/admin/jobs">

              <span>
                <i className="bi bi-briefcase"></i>
              </span>

              <div>
                <strong>Manage Jobs</strong>
                <small>View posted jobs</small>
              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>


            <Link to="/admin/applications">

              <span>
                <i className="bi bi-file-earmark-text"></i>
              </span>

              <div>
                <strong>Applications</strong>
                <small>Review applications</small>
              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>


            <Link to="/admin/reports">

              <span>
                <i className="bi bi-bar-chart"></i>
              </span>

              <div>
                <strong>Reports</strong>
                <small>View platform reports</small>
              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>

          </div>

        </article>


        {/* Recent Users */}

        <article className="admin-card admin-recent-card">

          <div className="admin-card-title">

            <h2>Recent Users</h2>

            <Link to="/admin/users">
              View all
            </Link>

          </div>


          <div className="admin-user-list">

            <div className="admin-user-row">

              <span className="user-avatar">A</span>

              <div>
                <strong>Ankit Sharma</strong>
                <small>ankit@gmail.com</small>
              </div>

              <span className="user-role candidate">
                Candidate
              </span>

              <small>Today</small>

            </div>


            <div className="admin-user-row">

              <span className="user-avatar">P</span>

              <div>
                <strong>Priya Verma</strong>
                <small>priya@gmail.com</small>
              </div>

              <span className="user-role recruiter">
                Recruiter
              </span>

              <small>Today</small>

            </div>


            <div className="admin-user-row">

              <span className="user-avatar">R</span>

              <div>
                <strong>Rahul Singh</strong>
                <small>rahul@gmail.com</small>
              </div>

              <span className="user-role candidate">
                Candidate
              </span>

              <small>Yesterday</small>

            </div>


            <div className="admin-user-row">

              <span className="user-avatar">S</span>

              <div>
                <strong>Sneha Patel</strong>
                <small>sneha@gmail.com</small>
              </div>

              <span className="user-role recruiter">
                Recruiter
              </span>

              <small>Yesterday</small>

            </div>

          </div>

        </article>


        {/* Recent Jobs */}

        <article className="admin-card admin-jobs-card">

          <div className="admin-card-title">

            <h2>Recent Jobs</h2>

            <Link to="/admin/jobs">
              View all
            </Link>

          </div>


          <div className="admin-job-list">

            <div className="admin-job-row">

              <div className="job-icon">
                <i className="bi bi-code-slash"></i>
              </div>

              <div>

                <strong>Frontend Developer</strong>

                <small>
                  Tech Solutions Inc.
                </small>

              </div>

              <span className="job-status open">
                Open
              </span>

            </div>


            <div className="admin-job-row">

              <div className="job-icon">
                <i className="bi bi-database"></i>
              </div>

              <div>

                <strong>Backend Developer</strong>

                <small>
                  Infosys
                </small>

              </div>

              <span className="job-status open">
                Open
              </span>

            </div>


            <div className="admin-job-row">

              <div className="job-icon">
                <i className="bi bi-palette"></i>
              </div>

              <div>

                <strong>UI/UX Designer</strong>

                <small>
                  Creative Minds
                </small>

              </div>

              <span className="job-status closed">
                Closed
              </span>

            </div>


            <div className="admin-job-row">

              <div className="job-icon">
                <i className="bi bi-shield-check"></i>
              </div>

              <div>

                <strong>QA Engineer</strong>

                <small>
                  TCS
                </small>

              </div>

              <span className="job-status open">
                Open
              </span>

            </div>

          </div>

        </article>


      </section>

    </div>
  );
}

export default AdminDashboard;