import React from "react";
import { Outlet } from "react-router-dom";
import CompanySidebar from "../../components/company/CompanySidebar";
import "./CompanyLayout.css";


const CompanyLayout = () => {

return (

<div className="company-layout">


<CompanySidebar/>


<div className="main-content">

<Outlet/>

</div>


</div>

)

}


export default CompanyLayout;