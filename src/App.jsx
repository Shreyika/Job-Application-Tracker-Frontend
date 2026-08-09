import './App.css'
import Layout from './components/common/Layout'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './components/Home'
import UserRegister from './components/pages/Auth/UserRegister'
import NotFound from './components/NotFound'
import UserLogin from './components/pages/Auth/UserLogin'
import { LoginProvider } from "./context/LoginContext";
import RecruiterDashboard from './components/pages/Recruiter/RecruiterDashboard';
import CandidateDashboard from './components/pages/Candidate/CandidateDashboard';
import CandidateProfile from './components/pages/Candidate/CandidateProfile';
import RecruiterProfile from './components/pages/Recruiter/RecruiterProfile';
import AddJobs from './components/pages/Recruiter/AddJobs';
import JobList from './components/pages/Recruiter/JobList';
import CandidateJobList from './components/pages/Candidate/CandidateJobList';
import CandidateJobDetails from './components/pages/Candidate/CandidateJobDetails';
import CandidateApplications from './components/pages/Candidate/CandidateApplications';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecruiterViewApplications from './components/pages/Recruiter/RecruiterViewApplications';
import CandidateLayout from './components/common/candidateNav/CandidateLayout';
import RecruiterLayout from './components/common/recruiterNav/RecruiterLayout';
import CandidateSaveJobs from './components/pages/Candidate/CandidateSaveJobs';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import AdminLayout from './components/common/adminNav/AdminLayout';


function ErrorMessage(){
  return <>
    <h1 className="bg-danger text-white">something went wrong</h1>
  </>
}

const router = createBrowserRouter([
  // Public pages
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/userlogin",
        element: <UserLogin />,
      },
      {
        path: "/userregister",
        element: <UserRegister />,
      },
    ],
  },

  // Candidate pages
 {
  element: <CandidateLayout />,
  children: [
    {
      path: "/candidate-dashboard",
      element: <CandidateDashboard />
    },
    {
      path: "/candidate-profile/:userId",
      element: <CandidateProfile />
    },
    {
      path: "/candidate-applications",
      element: <CandidateApplications />
    },
    {
      path: "/candidates/joblist",
      element: <CandidateJobList />
    },
    {
      path: "/candidates/jobdetails/:jobId",
      element: <CandidateJobDetails />
    },
    {
      path: "/candidates/savedjobs",
      element: <CandidateSaveJobs />
    }
  ]
},

 {
  element: <RecruiterLayout />,
  children: [
    {
      path: "/recruiter-dashboard",
      element: <RecruiterDashboard />
    },
    {
      path: "/recruiter-profile",
      element: <RecruiterProfile />
    },
    {
      path: "/add-job",
      element: <AddJobs />
    },
    {
      path: "/recruiters/jobs",
      element: <JobList />
    },
    {
      path: "/recruiter/jobs/:jobId/applications",
      element: <RecruiterViewApplications />
    }
  ]
},

//admin
{
  
  element: <AdminLayout />,
  children: [
    {
      path: "/admin-dashboard",
      element: <AdminDashboard />
    },

    // later
    // {
    //   path: "users",
    //   element: <AdminUsers />
    // },

    // {
    //   path: "jobs",
    //   element: <AdminJobs />
    // },

    // {
    //   path: "applications",
    //   element: <AdminApplications />
    // }
  ]
},
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  

  return (
    <>
      
      

   <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>

    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />

    </>
  )
}

export default App
