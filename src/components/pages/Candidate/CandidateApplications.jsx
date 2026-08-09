import React, { useEffect, useState } from 'react'
import { api } from '../../../api'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CandidateApplications() {

    const[applications, setApplications]=useState([]);

    const navigate = useNavigate();

    const myApplications = async ()=>{
        try {
            const response=await api.get("/applications/my");
            console.log(response.data);   
            setApplications(response.data);
        } catch (error) {
            alert("something went wrong");
        }
        
    }

    //withdraw Application
    const withdrawApplication = async (applicationId) => {

          const confirm = window.confirm(
              "Are you sure you want to withdraw this application?"
          );

    if (!confirm) return;

    try {

        await api.delete(`/applications/${applicationId}`);

        alert("Application withdrawn successfully.");

        // Refresh list
        myApplications();

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Unable to withdraw application."
        );
    }
      };

    useEffect(()=>{
        myApplications();
    },[]);

  return (
    <div>
       <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
  {applications.length > 0 ? (
    <div className="row row-cols-1 row-cols-md-3 g-4 m-3">
      {applications.map((application) => (
        <div className="col" key={application.applicationId}>
          <div className="card h-100 shadow-sm">

            <div className="card-body">

              <h5 className="card-title">
                {application.jobRole}
              </h5>

              <p className="card-text">
                <strong>Company:</strong> {application.companyName}
              </p>

              <p className="card-text">
                <strong>Application Status:</strong>{" "}
                <span className="badge bg-success">
                  {application.applicationStatus}
                </span>
              </p>

              <p className="card-text">
                <strong>Applied On:</strong>{" "}
                {application.appliedDate}
              </p>

              {application.interviewDate && (
                <p className="card-text">
                  <strong>Interview:</strong>{" "}
                  {application.interviewDate}
                </p>
              )}

            </div>

            <div className="card-footer bg-white border-0 d-flex justify-content-between">

              {application.applicationStatus === "APPLIED" && (
                <button
                    className="btn btn-danger"
                    onClick={() => withdrawApplication(application.applicationId)}
                >
                    Withdraw
                </button>
            )}

              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  navigate(`/candidates/jobdetails/${application.jobId}`)
                }
              >
                View Details
              </button>

            </div>

          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center mt-5">
      <h5>You haven't applied to any jobs yet.</h5>
    </div>
  )}
</div>
  )
}

export default CandidateApplications