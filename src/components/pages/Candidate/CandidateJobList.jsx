import React, { useEffect, useState } from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CandidateJobList() {
  const [jobs, setJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

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

  // Dynamic dropdown values
  const locations = [...new Set(jobs.map((job) => job.jobLocation))];
  const jobTypes = [...new Set(jobs.map((job) => job.jobType))];
  const roles = [...new Set(jobs.map((job) => job.jobRole))];

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesLocation =
      locationFilter === "" || job.jobLocation === locationFilter;

    const matchesType =
      typeFilter === "" || job.jobType === typeFilter;

    const matchesRole =
      roleFilter === "" || job.jobRole === roleFilter;

    return matchesLocation && matchesType && matchesRole;
  });

  return (
    <div className="container mt-4">

      {/* Filters */}
      <div className="row mb-4">

        <div className="col-md-3">
          <select
            className="form-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Job Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-secondary w-100"
            onClick={() => {
              setLocationFilter("");
              setTypeFilter("");
              setRoleFilter("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Job Cards */}
      {filteredJobs.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4 m-3">
          {filteredJobs.map((job) => (
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
                  <button className="btn btn-outline-primary btn-sm">
                    Save
                  </button>
                  <button onClick={() => navigate(`/candidates/jobdetails/${job.id}`)}>
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
  );
}

export default CandidateJobList;