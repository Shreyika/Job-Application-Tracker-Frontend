import React, { useEffect, useState } from "react";
import { api } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import "./CandidateJobDetails.css";

function CandidateJobDetails() {

  const { user } = useContext(LoginContext);

  const [job, setJob] = useState(null);
  const [applying, setApplying] = useState(false);

  const [applications, setApplications] = useState([]);
const [alreadyApplied, setAlreadyApplied] = useState(false);

//to check if profile is complete or not
const [profileCompleted, setProfileCompleted] = useState(false);
const [checkingProfile, setCheckingProfile] = useState(true);

  const [useDefaultResume, setUseDefaultResume] = useState(true);
  const [resume, setResume] = useState(null);

  const { jobId } = useParams();
  const navigate = useNavigate();

  const fetchJobDetails = async () => {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      setJob(response.data);
    } catch (error) {
      toast.error("Failed to load job details.");
    }
  };

  const checkCandidateProfile = async () => {

  if (!user?.id) {
    setCheckingProfile(false);
    return;
  }

  try {

    const response = await api.get(
      `/candidates/user/${user.id}`
    );

    if (response.data) {
      setProfileCompleted(true);
    }

  } catch (error) {

    console.log("Candidate profile check failed:", error);

    setProfileCompleted(false);

  } finally {

    setCheckingProfile(false);

  }
};

  const checkApplication = async () => {
  try {
    const response = await api.get("/applications/my");

    const applications = response.data || [];

    const hasApplied = applications.some((application) => {

      if (application.job?.id) {
        return Number(application.job.id) === Number(jobId);
      }

      if (application.jobId) {
        return Number(application.jobId) === Number(jobId);
      }

      return false;
    });

    setAlreadyApplied(hasApplied);

  } catch (error) {
    console.log("Error checking application:", error);
    setAlreadyApplied(false);
  }
};

  const applyJob = async () => {
    if (applying) return;

     if (!profileCompleted) {

    toast.warning(
      "Please complete your candidate profile before applying for a job."
    );

    navigate(`/candidate-profile/${user.id}`);

    return;
  }


    // Validate uploaded resume
    if (!useDefaultResume) {
      if (!resume) {
        toast.warning("Please select a resume.");
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(resume.type)) {
        toast.error("Only PDF, DOC and DOCX files are allowed.");
        return;
      }

      if (resume.size > 5 * 1024 * 1024) {
        toast.error("Resume size must be less than 5 MB.");
        return;
      }
    }

    try {
      setApplying(true);

      const formData = new FormData();

      if (!useDefaultResume) {
        formData.append("resume", resume);
      }

      const response = await api.post(
        `/applications/${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      toast.success("Applied successfully!");

      setResume(null);
      setUseDefaultResume(true);

      navigate("/candidate-applications");
    } catch (error) {
      console.log(error);

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Something went wrong.";

      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
    checkApplication();
    checkCandidateProfile();


  }, [jobId, user]);

  if (!job) {
    return (
      <div className="container mt-5 text-center">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">{job.jobRole}</h3>
          <h5 className="mb-0">{job.companyName}</h5>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Location</strong>
              <p>{job.jobLocation}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Job Type</strong>
              <p>{job.jobType}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Experience Required</strong>
              <p>{job.experienceRequired}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Salary</strong>
              <p>
                ₹{job.ctcMin} LPA - ₹{job.ctcMax} LPA
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Vacancies</strong>
              <p>{job.vacancy}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Application Deadline</strong>
              <p>{job.deadlineToApply}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Job Status</strong>
              <br />
              <span
                className={`badge ${
                  job.jobStatus === "OPEN"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {job.jobStatus}
              </span>
            </div>
          </div>

          <hr />

          <h5>Job Description</h5>

          <p style={{ whiteSpace: "pre-line" }}>
            {job.jobDescription}
          </p>

          <hr />

          <h5 className="mb-3">Resume Options</h5>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="resumeOption"
              checked={useDefaultResume}
              onChange={() => {
                setUseDefaultResume(true);
                setResume(null);
              }}
            />
            <label className="form-check-label">
              Use Default Resume
            </label>
          </div>

          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="radio"
              name="resumeOption"
              checked={!useDefaultResume}
              onChange={() => setUseDefaultResume(false)}
            />
            <label className="form-check-label">
              Upload New Resume
            </label>
          </div>

          {!useDefaultResume && (
            <>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="form-control mt-3"
                onChange={(e) => setResume(e.target.files[0])}
              />

              {resume && (
                <div className="mt-2 text-success">
                  Selected File: <strong>{resume.name}</strong>
                </div>
              )}
            </>
          )}
        </div>

          <div className="card-footer job-action-buttons">

            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/candidates/joblist")}
            >
              Back to Jobs
            </button>

            {!profileCompleted && !alreadyApplied && job.jobStatus === "OPEN" && (
              <button
                className="btn complete-profile-btn"
                onClick={() => navigate(`/candidate-profile/${user.id}`)}
              >
                <i className="bi bi-person-check me-2"></i>
                Complete Profile
              </button>
            )}

            {alreadyApplied && (
              <button
                className="btn btn-success"
                disabled
              >
                <i className="bi bi-check-circle me-2"></i>
                Already Applied
              </button>
            )}

            {!alreadyApplied && job.jobStatus === "OPEN" && (
              <span className="apply-tooltip-wrapper">
                      <button
                        className="btn apply-btn"
                        disabled={
                          applying ||
                          checkingProfile ||
                          !profileCompleted
                        }
                        onClick={applyJob}
                      >
                        {checkingProfile
                          ? "Checking Profile..."
                          : applying
                          ? "Applying..."
                          : "Apply"}
                      </button>

                      {!profileCompleted && !checkingProfile && (
                        <span className="apply-tooltip">
                          <i className="bi bi-exclamation-circle"></i>
                          Please complete your profile before applying.
                        </span>
                      )}
                    </span>
            )}

          </div>


      </div>
    </div>
  );
}

export default CandidateJobDetails;