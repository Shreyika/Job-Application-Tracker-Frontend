import React, { useEffect, useState } from "react";
import { api } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RecruiterViewApplications() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {

        try {

            const response = await api.get(`/applications/job/${jobId}`);

            console.log(response.data);

            setApplications(response.data);

        } catch (error) {

            console.log(error);
            toast.error("Failed to load applications.");

        }
    };

    const viewResume = async (applicationId) => {
    try {
        const response = await api.get(
            `/applications/${applicationId}/resume`,
            {
                responseType: "blob",
            }
        );

        const url = URL.createObjectURL(
            new Blob([response.data], {
                type: response.headers["content-type"],
            })
        );

        window.open(url);

    } catch (err) {
        console.log(err);
    }
};

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const updateStatus = async (applicationId, status) => {

        try {

            await api.put(
                `/applications/${applicationId}?status=${status}`
            );

            toast.success("Application status updated.");

            setApplications((prev) =>
                prev.map((app) =>
                    app.applicationId === applicationId
                        ? { ...app, applicationStatus: status }
                        : app
                )
            );

        } catch (error) {

            console.log(error);
            toast.error("Unable to update status.");

        }
    };

    return (

        <div className="container mt-4">

            <ToastContainer />

            <button
                className="btn btn-secondary mb-4"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <h2 className="mb-4">
                Job Applications
            </h2>

            {applications.length === 0 ? (

                <div className="alert alert-info">
                    No applications received yet.
                </div>

            ) : (

                <div className="row">

                    {applications.map((application) => (

                        <div
                            className="col-lg-6 mb-4"
                            key={application.applicationId}
                        >

                            <div className="card shadow h-100">

                                <div className="card-header bg-primary text-white">

                                    <h5 className="mb-0">
                                        {application.candidateName}
                                    </h5>

                                </div>

                                <div className="card-body">

                                    <p>
                                        <strong>Candidate ID:</strong>{" "}
                                        {application.candidateId}
                                    </p>

                                    <p>
                                        <strong>Job Role:</strong>{" "}
                                        {application.jobRole}
                                    </p>

                                    <p>
                                        <strong>Company:</strong>{" "}
                                        {application.companyName}
                                    </p>

                                    <p>
                                        <strong>Applied On:</strong>{" "}
                                        {application.appliedDate}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong>{" "}
                                        {application.candidatePhNo}
                                    </p>


                                    {application.interviewDate && (
                                        <p>
                                            <strong>Interview Date:</strong>{" "}
                                            {application.interviewDate}
                                        </p>
                                    )}

                                    <p>
                                        <strong>Application Status:</strong>{" "}
                                        <span className="badge bg-success">
                                            {application.applicationStatus}
                                        </span>
                                    </p>

                                    {application.resumeUrl && (
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => viewResume(application.applicationId)}
                                        >
                                            View Resume
                                        </button>
                                    )}

                                    <hr />

                                    <label className="form-label">
                                        Update Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={application.applicationStatus}
                                        onChange={(e) =>
                                            updateStatus(
                                                application.applicationId,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="APPLIED">
                                            APPLIED
                                        </option>

                                        <option value="SHORTLISTED">
                                            SHORTLISTED
                                        </option>

                                        <option value="REJECTED">
                                            REJECTED
                                        </option>


                                    </select>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default RecruiterViewApplications;