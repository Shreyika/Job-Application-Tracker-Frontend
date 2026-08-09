import React from 'react'
import { useForm } from 'react-hook-form'
import { api } from "../../../api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function AddJobs() {


  const{register, handleSubmit, formState: { errors },}=useForm();
  const navigate = useNavigate();
  const onSubmit=async (data)=>{

    console.log(data);
    try {
    const response = await api.post("/jobs", data);

    console.log(response.data);
    //alert("Job added successfully");
    toast.success("Job added successfully");
    navigate(`/recruiters/jobs`);
  } catch (error) {
    // console.error(error.response?.data || error);
    //alert("Failed to add job");
    toast.error("Oops!, Something went wrong");
  }
    
  }

  return (
    <div className="container mt-5">
      <button
                className="btn btn-secondary mb-4"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>
  <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="card shadow">
        <div className="card-header text-center">
          <h3>Add Job</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Job Role */}
            <div className="mb-3">
              <label className="form-label">Job Role</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter job role"
                {...register("jobRole", {
                  required: "Job role is required",
                })}
              />
              <small className="text-danger">
                {errors.jobRole?.message}
              </small>
            </div>

            {/* Company Name */}
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter company name"
                {...register("companyName", {
                  required: "Company name is required",
                })}
              />
              <small className="text-danger">
                {errors.companyName?.message}
              </small>
            </div>

            {/* Job Description */}
            <div className="mb-3">
              <label className="form-label">Job Description</label>
              <textarea
                rows="5"
                className="form-control"
                placeholder="Enter job description"
                {...register("jobDescription", {
                  required: "Job description is required",
                })}
              />
              <small className="text-danger">
                {errors.jobDescription?.message}
              </small>
            </div>

            {/* Job Location */}
            <div className="mb-3">
              <label className="form-label">Job Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                {...register("jobLocation", {
                  required: "Location is required",
                })}
              />
              <small className="text-danger">
                {errors.jobLocation?.message}
              </small>
            </div>

            {/* Job Type */}
            <div className="mb-3">
              <label className="form-label">Job Type</label>
              <select
                className="form-select"
                {...register("jobType", {
                  required: "Job type is required",
                })}
              >
                <option value="">Select Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>

              <small className="text-danger">
                {errors.jobType?.message}
              </small>
            </div>

            {/* Salary */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Minimum CTC</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Minimum CTC"
                  {...register("ctcMin", {
                    required: "Minimum CTC is required",
                  })}
                />
                <small className="text-danger">
                  {errors.ctcMin?.message}
                </small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Maximum CTC</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Maximum CTC"
                  {...register("ctcMax", {
                    required: "Maximum CTC is required",
                  })}
                />
                <small className="text-danger">
                  {errors.ctcMax?.message}
                </small>
              </div>
            </div>

            {/* Vacancy */}
            <div className="mb-3">
              <label className="form-label">Vacancies</label>
              <input
                type="number"
                className="form-control"
                placeholder="Number of vacancies"
                {...register("vacancy", {
                  required: "Vacancy is required",
                })}
              />
              <small className="text-danger">
                {errors.vacancy?.message}
              </small>
            </div>

            {/* Experience */}
            <div className="mb-3">
              <label className="form-label">Experience Required</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Fresher, 2 Years"
                {...register("experienceRequired", {
                  required: "Experience is required",
                })}
              />
              <small className="text-danger">
                {errors.experienceRequired?.message}
              </small>
            </div>

            {/* Job Status */}
            <div className="mb-3">
              <label className="form-label">Job Status</label>
              <select
                className="form-select"
                {...register("jobStatus", {
                  required: "Status is required",
                })}
              >
                <option value="">Select Status</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>

              <small className="text-danger">
                {errors.jobStatus?.message}
              </small>
            </div>

            {/* Deadline */}
            <div className="mb-4">
              <label className="form-label">Last Date to Apply</label>
              <input
                type="date"
                className="form-control"
                {...register("deadlineToApply", {
                  required: "Deadline is required",
                })}
              />
              <small className="text-danger">
                {errors.deadlineToApply?.message}
              </small>
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Add Job
            </button>
           

          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddJobs