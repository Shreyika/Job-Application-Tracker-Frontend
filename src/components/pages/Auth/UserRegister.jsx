import "../../UserRegister.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import jobHero from "../../../assets/job-hero.svg";
import { api } from "../../../api";

function UserRegister() {

    const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    
    console.log(data);
    const {role}=data;
    delete data.role;
    try {
      const response = await api.post(`/users?role=${role}`, data);
      console.log(response);
      // const userId = response.data.id;

      // if (data.role === "ROLE_RECRUITER") {
      //   navigate(`/recruiter-dashboard/${userId}`);
      // }

      // if (data.role === "ROLE_CANDIDATE") {
      //   navigate(`/candidate-dashboard/${userId}`);
      // }

      alert("Registration successful");
      navigate("/userlogin");
    } catch (error) {
      alert("Something went wrong");
      console.log("Error", error);
    }

    //const userId=response.data.id;

  };

  return (
    <main className="register-page">
      <section className="register-shell" aria-label="Create an account">
        <aside className="register-showcase">
          <div className="showcase-brand">
            <span className="brand-mark"><i className="bi bi-briefcase-fill" /></span>
            JobTrack
          </div>

          <div className="showcase-copy">
            <span className="eyebrow">YOUR CAREER, ORGANIZED</span>
            <h1>Find the right opportunity for you.</h1>
            <p>Keep every application, interview, and next step in one focused workspace.</p>
          </div>

          <article className="showcase-card">
            <img src={jobHero} alt="Illustration of a job search dashboard" />
            <div className="showcase-card-footer">
              <span className="check-icon"><i className="bi bi-check2" /></span>
              <span><strong>Everything in one place</strong>Track your job search with clarity.</span>
            </div>
          </article>
        </aside>

        <section className="register-panel">
          <div className="register-panel-content">
            <p className="panel-kicker">JOIN JOBTRACK</p>
            <h2>Create your account</h2>
            <p className="panel-intro">Start organizing your job search in minutes.</p>

            <form className="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="name-fields">
                <div className="field-group">
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" type="text" placeholder="Enter your first name" {...register("firstName", { required: "First name is required" })} />
                  <p className="error">{errors.firstName?.message}</p>
                </div>

                <div className="field-group">
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" type="text" placeholder="Enter your last name" {...register("lastName", { required: "Last name is required" })} />
                  <p className="error">{errors.lastName?.message}</p>
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="email">Email address</label>
                <input id="email" type="email" placeholder="you@example.com" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} />
                <p className="error">{errors.email?.message}</p>
              </div>

              <div className="field-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Create a password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Use at least 6 characters" } })} />
                <p className="error">{errors.password?.message}</p>
              </div>

              <div className="field-group">
                <label htmlFor="password">Confirm Password</label>
                <input id="confirmPassword" type="password" placeholder="Confirm password" {...register("confirmPassword", { required: "Confirm Password is required", minLength: { value: 6, message: "Use at least 6 characters" } })} />
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>

              <div className="field-group">
                <label htmlFor="role">I am a</label>
                <div className="select-wrap">
                  <select id="role" defaultValue="" {...register("role", { required: "Select an account type" })}>
                    <option value="" disabled>Select your role</option>
                    <option value="ROLE_RECRUITER">Recruiter</option>
                    <option value="ROLE_CANDIDATE">Candidate</option>
                  </select>
                  <i className="bi bi-chevron-down" aria-hidden="true" />
                </div>
                <p className="error">{errors.role?.message}</p>
              </div>

              <button type="submit" className="register-btn">Create account <i className="bi bi-arrow-right" /></button>
            </form>

            <p className="login-prompt">Already have an account? <Link to="/userlogin">Log in</Link></p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default UserRegister;
