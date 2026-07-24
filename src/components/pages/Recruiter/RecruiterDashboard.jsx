import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../../context/LoginContext'
import './RecruiterDashboard.css'

function RecruiterDashboard() {
  const { user, logout } = useContext(LoginContext);
  const navigate = useNavigate();
  const [showJobsMenu, setShowJobsMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const firstName = user?.firstName?.trim() || '';
  const recruiterName = firstName || user?.name || user?.email?.split('@')[0] || 'Recruiter';
  const initials = (firstName.charAt(0) || recruiterName.charAt(0)).toUpperCase();

  const applications = [
    ['A', 'Ankit Sharma', 'Frontend Developer', 'May 18, 2024', 'New', 'new'],
    ['P', 'Priya Verma', 'UI/UX Designer', 'May 18, 2024', 'Shortlisted', 'shortlisted'],
    ['R', 'Rahul Singh', 'Backend Developer', 'May 17, 2024', 'In Review', 'review'],
    ['S', 'Sneha Patel', 'QA Engineer', 'May 17, 2024', 'New', 'new'],
  ];

  const interviews = [
    ['Ankit Sharma', 'Frontend Developer', 'May 20, 2024', '10:00 AM'],
    ['Priya Verma', 'UI/UX Designer', 'May 20, 2024', '11:30 AM'],
    ['Rahul Singh', 'Backend Developer', 'May 21, 2024', '02:00 PM'],
  ];

  const handleLogout = () => {
    logout();
    navigate('/userlogin', { replace: true });
  };

  return (
    <main className="recruiter-portal">
      <aside className="recruiter-sidebar" aria-label="Recruiter portal navigation">
        <Link to="/recruiter-dashboard" className="recruiter-brand">
          <i className="bi bi-people-fill" />
          Recruiter Portal
        </Link>

        <nav className="recruiter-nav">
          <span className="recruiter-nav-item active">
            <i className="bi bi-grid-1x2" />
            Dashboard
          </span>

          <div className="jobs-menu">
            <button
              type="button"
              className="recruiter-nav-item jobs-menu-toggle"
              onClick={() => setShowJobsMenu(!showJobsMenu)}
              aria-expanded={showJobsMenu}
            >
              <i className="bi bi-briefcase" />
              Jobs
              <i className={`bi bi-chevron-${showJobsMenu ? 'up' : 'down'} nav-chevron`} />
            </button>

            {showJobsMenu && (
              <div className="jobs-menu-actions">
                <button type="button">
                  <i className="bi bi-plus-circle" />
                  Add New Job
                </button>
                <button type="button">
                  <i className="bi bi-list-ul" />
                  View All Jobs
                </button>
              </div>
            )}
          </div>

          <span className="recruiter-nav-item">
            <i className="bi bi-people" />
            Candidates
          </span>
          <span className="recruiter-nav-item">
            <i className="bi bi-file-earmark-text" />
            Applications
          </span>
          <span className="recruiter-nav-item">
            <i className="bi bi-calendar-event" />
            Interviews
          </span>
          <span className="recruiter-nav-item">
            <i className="bi bi-envelope" />
            Messages
          </span>
          <Link to="/recruiter-profile" className="recruiter-nav-item">
            <i className="bi bi-buildings" />
            Company Profile
          </Link>
          <span className="recruiter-nav-item">
            <i className="bi bi-gear" />
            Settings
          </span>
        </nav>

        <button className="recruiter-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right" />
          Logout
        </button>
      </aside>

      <section className="recruiter-content">
        <header className="recruiter-header">
          <div>
            <h1>Welcome, {recruiterName}!</h1>
            <p>Here&apos;s what&apos;s happening with your hiring.</p>
          </div>

          <div className="recruiter-account">
            <button aria-label="Notifications" className="notification">
              <i className="bi bi-bell" />
              <b>3</b>
            </button>
            <div className="profile-menu">
              <button
                type="button"
                className="profile-menu-toggle"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-expanded={showProfileMenu}
              >
                <span className="recruiter-avatar">{initials}</span>
                <span>{recruiterName}</span>
                <i className={`bi bi-chevron-${showProfileMenu ? 'up' : 'down'}`} />
              </button>

              {showProfileMenu && (
                <div className="profile-menu-actions">
                  <Link to="/recruiter-profile">
                    <i className="bi bi-person-gear" />
                    Edit Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="recruiter-mobile-header">
          <span className="recruiter-brand">
            <i className="bi bi-people-fill" />
            Recruiter Portal
          </span>
          <button onClick={handleLogout} aria-label="Log out">
            <i className="bi bi-box-arrow-right" />
          </button>
        </div>

        <section className="recruiter-metrics">
          <article className="recruiter-metric recruiter-card">
            <span className="recruiter-metric-icon blue"><i className="bi bi-briefcase-fill" /></span>
            <div>
              <small>Active Jobs</small>
              <b>12</b>
              <a href="#overview">View all jobs <i className="bi bi-arrow-right" /></a>
            </div>
          </article>

          <article className="recruiter-metric recruiter-card">
            <span className="recruiter-metric-icon green"><i className="bi bi-people-fill" /></span>
            <div>
              <small>Total Candidates</small>
              <b>245</b>
              <a href="#overview">View all candidates <i className="bi bi-arrow-right" /></a>
            </div>
          </article>

          <article className="recruiter-metric recruiter-card">
            <span className="recruiter-metric-icon purple"><i className="bi bi-file-earmark-text-fill" /></span>
            <div>
              <small>Applications</small>
              <b>128</b>
              <a href="#overview">View applications <i className="bi bi-arrow-right" /></a>
            </div>
          </article>

          <article className="recruiter-metric recruiter-card">
            <span className="recruiter-metric-icon orange"><i className="bi bi-calendar-event-fill" /></span>
            <div>
              <small>Interviews</small>
              <b>18</b>
              <a href="#overview">View interviews <i className="bi bi-arrow-right" /></a>
            </div>
          </article>
        </section>

        <section className="recruiter-lower-grid">
          <article className="recruiter-card overview-card">
            <div className="recruiter-card-title">
              <h2>Applications Overview</h2>
              <button>
                Last 7 days <i className="bi bi-chevron-down" />
              </button>
            </div>

            <svg
              className="applications-chart"
              viewBox="0 0 540 220"
              role="img"
              aria-label="Applications trend for the last seven days"
            >
              <g className="chart-grid">
                <line x1="32" y1="24" x2="525" y2="24" />
                <line x1="32" y1="72" x2="525" y2="72" />
                <line x1="32" y1="120" x2="525" y2="120" />
                <line x1="32" y1="168" x2="525" y2="168" />
              </g>
              <g className="chart-labels">
                <text x="0" y="28">100</text>
                <text x="10" y="76">75</text>
                <text x="10" y="124">50</text>
                <text x="10" y="172">25</text>
                <text x="16" y="210">0</text>
              </g>
              <polyline points="48,151 130,96 212,125 294,42 376,94 458,42 535,76" />
              <g className="chart-points">
                <circle cx="48" cy="151" r="3" />
                <circle cx="130" cy="96" r="3" />
                <circle cx="212" cy="125" r="3" />
                <circle cx="294" cy="42" r="3" />
                <circle cx="376" cy="94" r="3" />
                <circle cx="458" cy="42" r="3" />
                <circle cx="535" cy="76" r="3" />
              </g>
              <g className="chart-days">
                <text x="32" y="196">May 12</text>
                <text x="112" y="196">May 13</text>
                <text x="194" y="196">May 14</text>
                <text x="276" y="196">May 15</text>
                <text x="358" y="196">May 16</text>
                <text x="440" y="196">May 17</text>
                <text x="515" y="196">May 18</text>
              </g>
            </svg>
          </article>

          <article className="recruiter-card recent-card">
            <div className="recruiter-card-title">
              <h2>Recent Applications</h2>
              <a href="#overview">View all</a>
            </div>
            {applications.map(([initial, name, role, date, status, tone]) => (
              <div className="recent-row" key={name}>
                <span className="applicant-avatar">{initial}</span>
                <div>
                  <strong>{name}</strong>
                  <small>{role}</small>
                </div>
                <time>{date}</time>
                <span className={`recruiter-status ${tone}`}>{status}</span>
              </div>
            ))}
          </article>

          <article className="recruiter-card interview-card">
            <div className="recruiter-card-title">
              <h2>Upcoming Interviews</h2>
              <a href="#overview">View all</a>
            </div>
            {interviews.map(([name, role, date, time]) => (
              <div className="interview-row" key={name}>
                <span><i className="bi bi-calendar-event" /></span>
                <div>
                  <strong>{name}</strong>
                  <small>{role}</small>
                </div>
                <time>{date}<br />{time}</time>
              </div>
            ))}
            <button className="schedule-button">
              <i className="bi bi-plus" />
              Schedule Interview
            </button>
          </article>
        </section>
      </section>
    </main>
  )
}

export default RecruiterDashboard
