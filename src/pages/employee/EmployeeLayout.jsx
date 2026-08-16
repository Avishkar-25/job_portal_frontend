import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/employee/Footer";
import EmployeeNavbar from "../../components/employee/EmployeeNavbar";
function EmployeeLayout() {
  return (
    <>
      <EmployeeNavbar />

      <main className="container-fluid py-4">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
export default EmployeeLayout;