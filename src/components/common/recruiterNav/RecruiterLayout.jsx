import { Outlet } from "react-router-dom";
import RecruiterSidebar from "./RecruiterSidebar";

function RecruiterLayout() {
  return (
    <main className="recruiter-portal">
      <RecruiterSidebar />

      <section className="recruiter-content">
        <Outlet />
      </section>
    </main>
  );
}

export default RecruiterLayout;