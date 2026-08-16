import React from "react";


const DashboardCard = ({
title,
value,
icon,
color
}) => {


return (

<div className={`dashboard-card border-${color}`}>


<div className="card-icon text-${color}">

{icon}

</div>


<div>

<h6>
{title}
</h6>


<h2>
{value}
</h2>


</div>


</div>

);


};


export default DashboardCard;