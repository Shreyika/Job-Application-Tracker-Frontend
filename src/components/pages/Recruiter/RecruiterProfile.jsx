import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../api";
import { LoginContext } from "../../../context/LoginContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RecruiterProfile() {

    const { user } = useContext(LoginContext);

    const navigate = useNavigate();

    const [profileExists, setProfileExists] = useState(false);
    const [recruiterId, setRecruiterId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        try {

            let response;

            if (profileExists) {

                response = await api.put(
                    `/recruiters/${recruiterId}`,
                    data
                );

                console.log(response.data);

            } else {

                response = await api.post(
                    `/recruiters/register/${user.id}`,
                    data
                );

                console.log(response.data);

                setRecruiterId(response.data.recruiterId);
                setProfileExists(true);
            }

            toast.success("Profile saved successfully.");

            navigate("/recruiter-dashboard");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const response = await api.get(
                    `/recruiters/user/${user.id}`
                );

                reset(response.data);

                setRecruiterId(response.data.recruiterId);

                setProfileExists(true);

            } catch (error) {

                if (error.response?.status === 404) {

                    setProfileExists(false);

                }

            }

        };

        if (user) {

            loadProfile();

        }

    }, [user, reset]);

    return (

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

                            <h3>Recruiter Profile</h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* Company Name */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Company Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Company Name"
                                        {...register("companyName", {
                                            required: "Company Name is required",
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.companyName?.message}
                                    </small>

                                </div>

                                {/* Phone */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Phone Number

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Phone Number"
                                        {...register("phNo", {
                                            required: "Phone Number is required",
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.phNo?.message}
                                    </small>

                                </div>

                                {/* Website */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Company Website

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="https://example.com"
                                        {...register("companyWebsite", {
                                            required: "Website is required",
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.companyWebsite?.message}
                                    </small>

                                </div>

                                {/* Company Size */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Company Size

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Number of Employees"
                                        {...register("companySize", {
                                            required: "Company Size is required",
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.companySize?.message}
                                    </small>

                                </div>

                                {/* Job Title */}

                                <div className="mb-3">

                                    <label className="form-label">

                                        Job Title

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="HR Manager / Talent Acquisition"
                                        {...register("jobTitleRecruiter", {
                                            required: "Job Title is required",
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.jobTitleRecruiter?.message}
                                    </small>

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                >
                                    Save Profile
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default RecruiterProfile;