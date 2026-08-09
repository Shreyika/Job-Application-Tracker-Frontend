import { Link } from "react-router-dom";

function CandidateSidebar() {

    return (

        <div
            className="bg-dark text-white position-fixed"
            style={{
                width: "250px",
                height: "100vh"
            }}
        >

            <h4 className="p-3">
                Candidate Portal
            </h4>

            <Link
                className="nav-link text-white p-3"
                to="/candidate-dashboard"
            >
                Dashboard
            </Link>

            <Link
                className="nav-link text-white p-3"
                to="/candidate-profile/1"
            >
                Profile
            </Link>

            <Link
                className="nav-link text-white p-3"
                to="/candidates/joblist"
            >
                Jobs
            </Link>

            <Link
                className="nav-link text-white p-3"
                to="/candidate-applications"
            >
                Applications
            </Link>

        </div>

    );
}

export default CandidateSidebar;