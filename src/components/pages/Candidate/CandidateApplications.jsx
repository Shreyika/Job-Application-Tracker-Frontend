import React, { useEffect, useState } from 'react'
import { api } from '../../../api'
import { useNavigate } from 'react-router-dom';

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

    useEffect(()=>{
        myApplications();
    },[]);

  return (
    <div>
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
                <strong>Status:</strong>{" "}
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

              <button
                className="btn btn-danger btn-sm"
              >
                Withdraw
              </button>

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