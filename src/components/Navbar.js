import React from "react";
import "antd/dist/antd.css";
// import "..index.css";
import { PageHeader, Button } from "antd";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="site-page-header">
      <PageHeader 
        ghost={false}
        title="CRM"
        subTitle="Customer Relationship Management"
        extra={[ 
        <Button key="1"><Link to="/clients">Clients</Link></Button>, 
        <Button key="2"><Link to="/actions">Actions</Link></Button>, 
        <Button key="3"><Link to="/analytics">Analytics</Link></Button>]}
      ></PageHeader>
    </div>
  );
}

export default Navbar;
