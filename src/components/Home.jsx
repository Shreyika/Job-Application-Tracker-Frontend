import './Home.css';
import { Link } from 'react-router-dom';
import heroImage from '../assets/job-hero.svg';

const features = [
  ['bi-briefcase-fill', 'Manage Applications', 'Track and manage applications efficiently in one place.'],
  ['bi-file-earmark-richtext-fill', 'Post Jobs', 'Post unlimited jobs and find the right candidates.'],
  ['bi-person-circle', 'Candidate Profiles', 'Build professional profiles and showcase your skills.'],
  ['bi-calendar-check-fill', 'Interview Management', 'Schedule interviews and communicate easily.'],
  ['bi-bar-chart-fill', 'Recruitment Analytics', 'Get insights and make better hiring decisions.'],
  ['bi-bell-fill', 'Job Alerts', 'Get instant alerts for new jobs that match you.'],
];

const jobs = [
  ['Google', 'Frontend Developer', 'Mumbai, India', '₹ 8 - 12 LPA'],
  ['Infosys', 'Java Developer', 'Pune, India', '₹ 6 - 10 LPA'],
  ['Microsoft', 'Software Engineer', 'Bangalore, India', '₹ 12 - 18 LPA'],
  ['TCS', 'React Developer', 'Remote', '₹ 7 - 11 LPA'],
];

function Home() {
  return (
    <main className="new-home-page">
      <section className="landing-hero" id="home">
        <div className="landing-container hero-layout">
          <div className="hero-copy">
            <p className="home-eyebrow">YOUR CAREER, ORGANIZED</p>
            <h1>Find Your Dream Job<br />or <span>Hire Top Talent</span></h1>
            <p>JobTrack connects talented people with better opportunities and helps recruiters find the right candidates faster.</p>
            <div className="hero-actions">
              <Link to="/userregister" className="primary-home-button"><i className="bi bi-briefcase" />Find Jobs</Link>
              <Link to="/userregister" className="secondary-home-button"><i className="bi bi-plus-lg" />Post a Job</Link>
            </div>
            <div className="hero-numbers">
              <span><i className="bi bi-briefcase-fill" /><b>20K+</b><small>Jobs Posted</small></span>
              <span><i className="bi bi-people-fill" /><b>15K+</b><small>Candidates</small></span>
              <span><i className="bi bi-person-workspace" /><b>3K+</b><small>Recruiters</small></span>
            </div>
          </div>
          <div className="hero-visual"><img src={heroImage} alt="Job seekers and recruiters using JobTrack" /></div>
        </div>
      </section>

      <section className="landing-container job-search" aria-label="Job search">
        <label><i className="bi bi-search" /><input placeholder="Job title, keywords or company" /></label>
        <label><i className="bi bi-geo-alt" /><input placeholder="Location" /></label>
        <label className="experience-select">Experience <i className="bi bi-chevron-down" /></label>
        <button>Search Jobs</button>
      </section>

      <section className="landing-container section-block" id="features">
        <SectionTitle title={<>Why Choose <span>JobTrack?</span></>} />
        <div className="feature-grid">
          {features.map(([icon, title, text]) => <article className="feature-card" key={title}><span><i className={`bi ${icon}`} /></span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="landing-container role-grid">
        <article className="role-card recruiter-role"><div><h2>For Recruiters</h2><ul><li>Post jobs and reach top talent</li><li>Manage applications in one place</li><li>Shortlist and schedule interviews</li><li>Track hiring progress with analytics</li></ul><Link to="/userregister">Start Hiring</Link></div><i className="bi bi-person-workspace role-illustration" /></article>
        <article className="role-card candidate-role"><div><h2>For Candidates</h2><ul><li>Search thousands of job openings</li><li>Apply easily with one click</li><li>Track your applications</li><li>Get noticed by top recruiters</li></ul><Link to="/userregister">Find Jobs</Link></div><i className="bi bi-person-vcard role-illustration" /></article>
      </section>

      <section className="landing-container section-block" id="jobs">
        <SectionTitle title="Featured Jobs" />
        <div className="job-card-grid">{jobs.map(([company, title, location, salary]) => <article className="public-job-card" key={title}><span className="company-mark">{company.charAt(0)}</span><div><small>{company}</small><h3>{title}</h3></div><p><i className="bi bi-geo-alt" />{location}<b>Full-time</b></p><strong>{salary}</strong><Link to="/userregister">Apply Now</Link></article>)}</div>
      </section>

      <section className="landing-container home-stat-banner"><span><i className="bi bi-file-earmark-text" /><b>20,000+</b><small>Jobs Posted</small></span><span><i className="bi bi-people" /><b>15,000+</b><small>Candidates</small></span><span><i className="bi bi-person-workspace" /><b>3,000+</b><small>Recruiters</small></span><span><i className="bi bi-award" /><b>12,000+</b><small>Successful Placements</small></span></section>

      <section className="landing-container section-block" id="how-it-works">
        <SectionTitle title="How It Works?" />
        <div className="steps-grid"><Steps title="For Recruiters" tone="blue" steps={['Create Account', 'Post Job', 'Review Applications', 'Hire Candidate']} /><Steps title="For Candidates" tone="green" steps={['Create Account', 'Complete Profile', 'Apply for Jobs', 'Get Hired']} /></div>
      </section>

      <section className="landing-container section-block testimonials">
        <SectionTitle title="What People Say" />
        <div className="testimonial-grid"><Testimonial quote="JobTrack has simplified our hiring process and helped us find the best talent quickly." name="Rajesh Sharma" role="HR Manager, TechCorp" /><Testimonial quote="Great platform to find genuine job opportunities. Got my dream job here!" name="Priya Singh" role="Software Engineer" /><Testimonial quote="Excellent experience! Easy to use and very effective for both recruiters and candidates." name="Amit Kumar" role="Recruiter, Infosys" /></div>
      </section>
    </main>
  );
}

function SectionTitle({ title }) { return <h2 className="section-title">{title}</h2>; }
function Steps({ title, tone, steps }) { return <article className={`steps-card ${tone}`}><h3>{title}</h3><div>{steps.map((step, index) => <span key={step}><b>{index + 1}</b><i className={index === 3 ? 'bi bi-trophy-fill' : index === 2 ? 'bi bi-send-fill' : index === 1 ? 'bi bi-file-earmark-text-fill' : 'bi bi-person-plus-fill'} /><small>{step}</small>{index < 3 && <em>→</em>}</span>)}</div></article>; }
function Testimonial({ quote, name, role }) { return <article className="testimonial-card"><div>★★★★★</div><p>“{quote}”</p><strong>{name}</strong><small>{role}</small></article>; }

export default Home;
