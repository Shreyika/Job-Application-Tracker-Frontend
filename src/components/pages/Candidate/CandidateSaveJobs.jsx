import React, { useEffect, useState } from 'react'
import { api } from '../../../api';
import { useNavigate } from 'react-router-dom';

function CandidateSaveJobs() {

    const [jobs, setJobs] = useState([]);

    const navigate = useNavigate();

    // Fetch Jobs
      const fetchJobs = async () => {
        try {
          const response = await api.get("/jobs");
          setJobs(response.data);
        } catch (error) {
          toast.error("Something went wrong while fetching jobs.");
        }
      };
    
      
    
      useEffect(() => {
        fetchJobs();
      }, []);

  return (
    <div className="container mt-4">
        

    {/* Job Cards */}
      {jobs.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4 m-3">
          {jobs.map((job) => (
            <div className="col" key={job.jobId}>
              <div className="card h-100 shadow-sm">

                <div className="card-body">
                  <h5 className="card-title">{job.jobRole}</h5>

                  <p className="card-text">
                    <strong>Company:</strong> {job.companyName}
                  </p>

                  <p className="card-text">
                    <strong>Location:</strong> {job.jobLocation}
                  </p>

                  <p className="card-text">
                    <strong>Job Type:</strong> {job.jobType}
                  </p>
                </div>

                <div className="card-footer bg-white border-0 d-flex justify-content-between">
                  
                  <button className="btn btn-primary" onClick={() => navigate(`/candidates/jobdetails/${job.id}`)}>
                    View Details
                </button>
                  
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <h5>No jobs found.</h5>
        </div>
      )}

    </div>
  )
}

export default CandidateSaveJobs