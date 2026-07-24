import "../../UserLogin.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useContext } from "react";
import { api } from "../../../api";
import { LoginContext } from "../../../context/LoginContext";

function UserLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const {login}=useContext(LoginContext);


  const onSubmit = async (data) => {
    console.log("Login Data:", data);

    try {
      const response=await api.post("/auth/login",data);
      console.log(response);
      const role = response.data.userDto.role;
      login(response.data.token, response.data.userDto);
      if (role == "ROLE_RECRUITER") {
        navigate(`/recruiter-dashboard`);
      } else if (role == "ROLE_CANDIDATE") {
        navigate(`/candidate-dashboard`);
      }
      
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <main className="login-page">
      <div className="login-shell">

      <section className="login-showcase">
        <div className="login-brand">
          <i className="bi bi-people-fill" />
          Job<span>Track</span>
        </div>

        <div className="showcase-content">
          <p className="showcase-kicker">YOUR CAREER, ORGANIZED</p>
          <h1>Find opportunities.<br /><span>Build your future.</span></h1>
          <p>Keep every job application, interview, and career goal in one focused workspace.</p>

          <div className="login-benefits">
            <span><i className="bi bi-check2-circle" />Track your applications in one place</span>
            <span><i className="bi bi-check2-circle" />Discover roles that match your skills</span>
            <span><i className="bi bi-check2-circle" />Stay ready for every interview</span>
          </div>

          <div className="login-preview" aria-hidden="true">
            <div className="preview-icon"><i className="bi bi-briefcase-fill" /></div>
            <div><b>Your next opportunity</b><small>Everything you need to move forward.</small></div>
            <i className="bi bi-arrow-up-right" />
          </div>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-form-box">
          <p className="login-kicker">WELCOME BACK</p>
          <h2>Log in to your account</h2>
          <p className="login-intro">Continue managing your career journey.</p>

          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <input
              type="text"
              placeholder="Email address or mobile number"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format"
                }
              })}
            />
            <p className="error">{errors.email?.message}</p>

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters"
                }
              })}
            />
            <p className="error">{errors.password?.message}</p>

            {/* Login Button */}
            <button type="submit" className="login-btn">Log in</button>
          </form>

          
          <button
            type="button"
            className="create-btn"
            onClick={() => navigate("/userregister")}
          >
            Create new account
          </button>

        
        </div>
      </section>
      </div>
    </main>
  );
}

export default UserLogin;
