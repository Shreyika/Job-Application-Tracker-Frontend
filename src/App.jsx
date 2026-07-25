import './App.css'
import Layout from './components/common/Layout'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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



function ErrorMessage(){
  return <>
    <h1 className="bg-danger text-white">something went wrong</h1>
  </>
}

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    errorElement:<ErrorMessage/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'userregister',
        element:<UserRegister/>,
        // children:[] //for url - register/to route anywhere else - in this case we will write routing and outlet in register.jsx 
      },
      {
        path:'userlogin',
        element:<UserLogin/>
      },
      {
        path:'recruiter-dashboard',
        element:<RecruiterDashboard/>
      },
      {
        path:'candidate-dashboard',
        element:<CandidateDashboard/>
      },
      {
        path:'candidate-profile',
        element:<CandidateProfile/>
      },
      {
        path:'recruiter-profile',
        element:<RecruiterProfile/>
      },
      {
        path:'add-job',
        element:<AddJobs/>
      },
      {
        path:'recruiters/jobs',
        element:<JobList/>
      },
      {
        //* means if any route excluding the above declared ones
        path:'*',
        element:<NotFound/>
      },
      
    ],
  }
])

function App() {
  

  return (
    <>
      
   <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>

    </>
  )
}

export default App
