import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { api } from '../../../api';
import { toast } from "react-toastify";
import * as bootstrap from "bootstrap";


function JobList() {

    const[jobs, setJobs]=useState(null);
    const[jobId, setJobId]=useState(null);
    const [showModal, setShowModal] = useState(false);

    const{register, handleSubmit, reset, formState: { errors },}=useForm();

    //  To fetch jobs
    const fetchJobs = async ()=>{
        try {
             const response = await api.get("/jobs");
            setJobs(response.data);
        } catch (error) {
            alert("something went wrong");
        }
       
    };

    // To update jobs
    const updateJob = async (data)=>{
        console.log(data);
        try {
            const response = await api.put(`/jobs/${jobId}`,data);
            console.log(response.data);

            toast.success("Job updated successfully!");
            alert("job updated");
            setShowModal(false);

            fetchJobs();

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
            
        }
        
    }

    // to delete job
    const deleteJob = async (id)=>{
        const response = await api.delete(`/jobs/${id}`);
        fetchJobs();
        alert("job deleted");
    };

    useEffect(()=>{
        fetchJobs();
    },[]);

  return (
     <div>
      <h2>Total Jobs :{jobs && jobs.length}</h2>

    
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={handleSubmit(updateJob)}>
                
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Job Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    {...register("jobRole")}
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    {...register("companyName")}
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Job Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    {...register("jobDescription")}
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Job Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    {...register("jobLocation")}
                  />
                </div>

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

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Ctc Min
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    {...register("ctcMin")}
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Ctc Max
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    {...register("ctcMax")}
                  />
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

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Experienced required
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    {...register("experienceRequired")}
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Vacancy
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    {...register("vacancy")}
                  />
                </div>

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


                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Edit Job
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>

      {jobs ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Job Role</th>
                <th scope="col">Company Name</th>
                <th scope="col">Job Location</th>
                <th scope="col">Job Type</th>
                <th scope="col">Vacancies</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr>
                  <th scope="row">{j.id}</th>
                  <td>{j.jobRole}</td>
                  <td>{j.companyName}</td>
                  <td>{j.jobLocation}</td>
                  <td>{j.jobType}</td>
                  <td>{j.vacancy}</td>
                  
                  <td>
                    <button
                      className="btn btn-success m-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setJobId(j.id); // step 2
                        reset({
                        jobRole: j.jobRole,
                        companyName: j.companyName,
                        jobDescription: j.jobDescription,
                        jobLocation: j.jobLocation,
                        jobType: j.jobType,
                        ctcMin: j.ctcMin,
                        ctcMax: j.ctcMax,
                        jobStatus: j.jobStatus,
                        deadlineToApply: j.deadlineToApply,
                        experienceRequired: j.experienceRequired,
                        vacancy: j.vacancy,
                        });
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => deleteJob(j.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading......</p>
      )}
    </div>
  )
}

export default JobList