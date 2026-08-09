import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../../../context/LoginContext';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CandidateProfile() {

  //   try {
  //       const response = await api.get("/candidates");

  //       reset(response.data);     // react-hook-form
  //       setProfileExists(true);

  //   } catch (error) {
  //       if (error.response?.status === 404) {
  //           setProfileExists(false);
  //       }
  //   }
  // };
  const { user } = useContext(LoginContext); 
  const [profileExists, setProfileExists] = useState(false);
  const [candidateId, setCandidateId] = useState(null);
  //const { userId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {

    // Remove resume from JSON because it is uploaded separately
    const candidateData = { ...data };
    delete candidateData.resume;

    let response;

    // Create or Update Candidate Profile
    if (profileExists) {

      response = await api.put(
        `/candidates/${candidateId}`,
        candidateData
      );

      //console.log("Candidate updated:", response.data);
      //toast.success("Profile updated successfully.");

    } else {

      response = await api.post(
        `/candidates/register/${user.id}`,
        candidateData
      );

      //console.log("Candidate created:", response.data);
      //toast.success("Profile created successfully.");

      // Save candidateId for future updates
      setCandidateId(response.data.candidateId);
      setProfileExists(true);
    }

    // Upload Resume (if selected)
    if (data.resume?.[0]) {
    const formData = new FormData();
    formData.append("resume", data.resume[0]);

    const responseResume = await api.put(
        "/candidates/resume",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    //console.log(responseResume);
}

    toast.success("Profile saved successfully.");
    navigate("/candidate-dashboard");

  } catch (error) {

    console.error(error);

    if (error.response) {
      toast.error(error.response.data.message || "Something went wrong.");
    } else {
      toast.error("Server not responding.");
    }

  }
};

  useEffect(() => {

    const loadProfile = async () => {

        try {

            const response = await api.get(
                `/candidates/user/${user.id}`
            );

            reset(response.data);

            setCandidateId(response.data.candidateId);

            setProfileExists(true);

        } catch (error) {

            if (error.response?.status === 404) {
                setProfileExists(false);
            }

        }

    };

    if(user){
        loadProfile();
    }

}, [user]);

  return (
    <div>

        <div className="container mt-5">
          <button
              className="btn btn-outline-secondary mb-4"
              onClick={() => navigate(-1)}
            >
              ← Back
          </button>
          <div className="row justify-content-center">
            
            <div className="col-md-8">
              <div className="card shadow">
                <div className="card-header text-center">
                  <h3>Candidate Profile</h3>
                </div>

                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Gender */}
                    <div className="mb-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>

                      <small className="text-danger">
                        {errors.gender?.message}
                      </small>
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-3">
                      <label className="form-label">Date of Birth</label>

                      <input
                        type="date"
                        className="form-control"
                        {...register("dateOfBirth", {
                          required: "Date of Birth is required",
                        })}
                      />

                      <small className="text-danger">
                        {errors.dateOfBirth?.message}
                      </small>
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter phone number"
                        {...register("candidatePhNo", {
                          required: "Phone number is required",
                        })}
                      />

                      <small className="text-danger">
                        {errors.candidatePhNo?.message}
                      </small>
                    </div>

                    {/* Current Job Title */}
                    <div className="mb-3">
                      <label className="form-label">Current Job Title</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex. Software Engineer"
                        {...register("currentJobTitle", {
                          required: "Current Job Title is required",
                        })}
                      />

                      <small className="text-danger">
                        {errors.currentJobTitle?.message}
                      </small>
                    </div>

                    {/* Experience */}
                    <div className="mb-3">
                      <label className="form-label">
                        Experience (Years)
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        {...register("candidateExperience", {
                          required: "Experience is required",
                        })}
                      />

                      <small className="text-danger">
                        {errors.candidateExperience?.message}
                      </small>
                    </div>

                    {/* Current CTC */}
                    <div className="mb-3">
                      <label className="form-label">
                        Current CTC (LPA)
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        {...register("currentCTC", {
                          required: "Current CTC is required",
                        })}
                      />

                      <small className="text-danger">
                        {errors.currentCTC?.message}
                      </small>
                    </div>

                    {/* Notice Period */}
                    <div className="mb-3">
                      <label className="form-label">
                        Notice Period (Days)
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        {...register("noticePeriod", {
                          required: "Notice period is required",
                        })}
                      />

                      <small className="text-danger">
                        {errors.noticePeriod?.message}
                      </small>
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                      <label className="form-label">Location</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your location"
                        {...register("candidateLocation", {
                          required: "Location is required",
                        })}
                      />

                      <small className="text-danger">
                        {errors.candidateLocation?.message}
                      </small>
                    </div>

                    {/* Resume */}
                    <div className="mb-3">
                      <label className="form-label">
                        Upload Resume
                      </label>

                      <input
                          type="file"
                          className="form-control"
                          {...register("resume")}
                      />
                    </div>

                    {/* Candidate Bio */}
                    <div className="mb-3">
                      <label className="form-label">
                        Professional Summary
                      </label>

                      <textarea
                        rows="5"
                        className="form-control"
                        placeholder="Write about yourself..."
                        {...register("candidateBio", {
                          required: "Bio is required",
                        })}
                      ></textarea>

                      <small className="text-danger">
                        {errors.candidateBio?.message}
                      </small>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Save Profile
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CandidateProfile