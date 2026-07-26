import { useContext } from 'react'
import { Link, Links, useNavigate } from 'react-router-dom'
import { LoginContext } from "../../../context/LoginContext";
import './CandidateDashboard.css'

function CandidateDashboard() {
  const { user, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const firstName = user?.firstName?.trim() || '';
  const lastName = user?.lastName?.trim() || '';
  const displayName = `${firstName} ${lastName}`.trim() || user?.name || user?.email?.split('@')[0] || 'Candidate';
  const initials = (firstName.charAt(0) + lastName.charAt(0) || displayName.charAt(0)).toUpperCase();
  const email = user?.email || 'Complete your profile to add an email address';

  const handleLogout = () => {
    logout();
    navigate('/userlogin', { replace: true });
  };

   

  const navigationItems = [
    ['bi-grid-1x2', 'Dashboard', '/candidate-dashboard'],
    ['bi-person', 'Profile', '/candidate-profile'],
    ['bi-file-earmark-text', 'My Applications'],
    ['bi-heart', 'Saved Jobs'],
    ['bi-bell', 'Alerts'],
    ['bi-envelope', 'Messages'],
    ['bi-gear', 'Settings'],
  ];

  const applications = [
    { title: 'Frontend Developer', company: 'Tech Solutions Inc.', status: 'In Review', date: 'May 18, 2024', tone: 'review' },
    { title: 'UI/UX Designer', company: 'Creative Minds', status: 'Shortlisted', date: 'May 16, 2024', tone: 'shortlisted' },
    { title: 'Product Designer', company: 'Design Studio', status: 'Applied', date: 'May 14, 2024', tone: 'applied' },
  ];

  //recomended jobs
  const jobs = [
    ['Frontend Developer', 'Innovative Pvt. Ltd.', 'Pune, India'],
    ['UI Developer', 'Web Creators', 'Mumbai, India'],
    ['React Developer', 'NextGen Labs', 'Bangalore, India'],
  ];

  return (
    <main className="candidate-portal">
      <aside className="candidate-sidebar" aria-label="Candidate portal navigation">
        <Link to="/candidate-dashboard" className="portal-brand"><i className="bi bi-briefcase" /> <span>Candidate Portal</span></Link>
        <nav className="portal-nav">
          {navigationItems.map(([icon, label, path]) => path ? (
            <Link key={label} to={path} className={`portal-nav-item${label === 'Dashboard' ? ' active' : ''}`}>
              <i className={`bi ${icon}`} />{label}
            </Link>
          ) : (
            <span key={label} className="portal-nav-item muted"><i className={`bi ${icon}`} />{label}</span>
          ))}
        </nav>
        <button className="portal-logout" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right" />
            Logout
        </button>
      </aside>

      <section className="candidate-content">
        <header className="candidate-mobile-header"><span className="portal-brand"><i className="bi bi-briefcase" /> Candidate Portal</span><button onClick={handleLogout} aria-label="Log out"><i className="bi bi-box-arrow-right" /></button></header>
        <div className="candidate-top-grid">
          <section className="profile-summary card-surface">
            <div className="profile-avatar" aria-label={`${displayName} avatar`}>{initials}</div>
            <div className="profile-details">
              <div className="profile-heading"><h1>{displayName}</h1><span className="profile-complete">Profile Complete <b>85%</b></span></div>
              <p><i className="bi bi-envelope" />{email}</p>
              <p className="profile-meta"><span><i className="bi bi-telephone" />+91 98765 43210</span><span><i className="bi bi-geo-alt" />Pune, India</span></p>
              <div className="profile-actions"><button className="outline-button">View Public Profile</button><Link to="/candidate-profile" className="solid-button">Edit Profile</Link></div>
            </div>
          </section>

          <section className="metrics-grid" aria-label="Candidate statistics">
            <Metric icon="bi-briefcase-fill" label="Applications" value="8" tone="blue" />
            <Metric icon="bi-calendar-event" label="Interviews" value="2" tone="purple" />
            <Metric icon="bi-heart-fill" label="Saved Jobs" value="5" tone="coral" />
            <Metric icon="bi-bell" label="Alerts" value="3" tone="amber" />
          </section>
        </div>

          {/* Bottom Section */}
<div className="candidate-bottom-grid">

  {/* Applications */}
  <section className="list-card card-surface">
    <div className="card-title">
      <h2>Applications</h2>
      <a href="#overview">View all</a>
    </div>

    <div className="application-list">
      {applications.map((application) => (
        <article className="application-row" key={application.title}>
          <i className="bi bi-arrow-right-short"></i>

          <div>
            <strong>{application.title}</strong>
            <small>{application.company}</small>
          </div>

          <span className={`status-pill ${application.tone}`}>
            {application.status}
          </span>

          <time>{application.date}</time>
        </article>
      ))}
    </div>
  </section>

  {/* Recommended Jobs */}
  <section className="list-card card-surface">
    <div className="card-title">
      <h2>Recommended Jobs</h2>
      <Link to="/candidates/joblist">View all</Link>
    </div>

    <div className="job-list">
      {jobs.map(([title, company, location]) => (
        <article className="job-row" key={title}>
          <div>
            <strong>{title}</strong>
            <small>{company}</small>
          </div>

          <span>
            <i className="bi bi-geo-alt"></i> {location}
          </span>

          <span>Full-time</span>

          <button aria-label={`Save ${title}`}>
            <i className="bi bi-bookmark"></i>
          </button>
        </article>
      ))}
    </div>
  </section>

  {/* Profile Strength */}
  <section className="strength-card card-surface">
    <h2>Profile Strength</h2>

    <div className="strength-overview">
      <div className="progress-ring">
        <b>85%</b>
      </div>

      <p>
        <strong>Great! Your profile is</strong>
        <br />
        almost complete.
      </p>
    </div>

    <ul className="strength-list">
      <li>
        <i className="bi bi-check-lg"></i>
        Personal Information
      </li>
      <li>
        <i className="bi bi-check-lg"></i>
        Work Experience
      </li>
      <li>
        <i className="bi bi-check-lg"></i>
        Education
      </li>
      <li>
        <i className="bi bi-check-lg"></i>
        Skills
      </li>
      <li className="pending">
        <i className="bi bi-circle"></i>
        Resume Upload
      </li>
    </ul>

    <i className="bi bi-clipboard-check strength-illustration"></i>
  </section>

</div>

      </section>
    </main>
  )
}

function Metric({ icon, label, value, tone }) {
  return <article className="metric-card card-surface"><span className={`metric-icon ${tone}`}><i className={`bi ${icon}`} /></span><strong>{label}</strong><b>{value}</b><a href="#overview">View all <i className="bi bi-arrow-right" /></a></article>
}

// function CardTitle({ title }) {
//   return <div className="card-title"><h2>{title}</h2><a href="#overview">View all</a></div>
// }

export default CandidateDashboard
