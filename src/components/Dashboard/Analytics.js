import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import MainData from "./MainData";
import { Row, Col, DatePicker } from "antd";
import TopEmployees from "./TopEmployees";
import ClientsAcquisition from "./ClientsAcquisition";
import ClientsByMonth from "./ClientsByMonth";
import SalesCategories from "./SalesCategories";
import "../../index.css";

const Analytics = inject("ClientsStore")(
  observer(props => {
    const style = { padding: "8px 0", margin: "20px" };

    const { RangePicker } = DatePicker;
    const monthFormat = "MMMM-YYYY";

    useEffect(() => {
      props.ClientsStore.getFirstContactByMonths();
    });

    const handleChange = values => {
      props.ClientsStore.dateRange(values);
    };

    return (
      <div className="analytics">
        <Row justify="space-around" align="top" gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} >
          <Col span={24}>
            <MainData />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} justify="space-around" align="top">
          <Col className="gutter-row" gutter={{ xs: 2, sm: 4, md: 8, lg: 8 }}>
            <div className="title">Top Employees</div>
            <TopEmployees />
          </Col>
          <Col className="gutter-row" gutter={{ xs: 6, sm: 10, md: 14, lg: 1 }}>
            <div className="title">
              Sales By
              <span >
                <SalesCategories />
              </span>
            </div>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} justify="space-around" align="top">
          <Col className="gutter-row" gutter={{ xs: 6, sm: 10, md: 20, lg: 20 }}>
            <div className="title" style={{ display: "inline", float: "left", marginBottom: "25px" }}>
              Sales
              <span style={{ marginLeft: "10px" }}>
                <RangePicker picker="month" format={monthFormat} onChange={handleChange} bordered={false} />
              </span>
            </div>
            <div>
              <ClientsByMonth />
            </div>
          </Col>
          <Col className="gutter-row" gutter={{ xs: 2, sm: 4, md: 8, lg: 8 }}>
            <div className="title">Client Acquisition</div>
            <div style={{ style }}>
              <ClientsAcquisition style={{ style }} />
            </div>
          </Col>
        </Row>
      </div>
    );
  })
);

export default Analytics;
