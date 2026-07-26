import React, { useEffect, useState } from "react";
import { api } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CandidateJobDetails() {
  const [job, setJob] = useState(null);
  const [applying, setApplying] = useState(false);


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

  const applyJob = async () => {

  if(applying) return;

  try {
    setApplying(true);

    await api.post(`/applications/${job.id}`);

    toast.success("Applied successfully!");

    navigate("/candidate-applications");

  } catch(error) {

    //alert("something went wrong");
    toast.error("This job is already applied");

  } finally {
    setApplying(false);
  }
}

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  

  if (!job) {
    return (
      <div className="container mt-5 text-center">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">

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
              <strong>Status</strong>
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

        </div>

        <div className="card-footer d-flex justify-content-end gap-2">

          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/candidates/joblist")}
          >
            Back to Jobs
          </button>

          <button className="btn btn-primary"
            disabled={applying}
            onClick={applyJob}
            >
            {applying ? "Applying..." : "Apply"}
        </button>

        </div>

      </div>
    </div>
  );
}

export default CandidateJobDetails;