import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Row, Col, Statistic } from "antd";
import { LineChartOutlined, MailOutlined, UsergroupAddOutlined ,GlobalOutlined} from '@ant-design/icons';
import "antd/dist/antd.css";

const MainData = inject("ClientsStore")(
  observer(props => {
    const style = { background: "#86BBD8", padding: "8px 0" , margin: '5px' };
    const monthName = new Date().toLocaleString('en-us', { month: 'long' })

    useEffect(()=> {
        props.ClientsStore.getHottestCountry()
    })
   
    return (
      <Row >
        <Col className="gutter-row" flex='1'  >
          <Statistic title={`New ${monthName} Clients`} value={props.ClientsStore.monthClients} style={style} prefix={<LineChartOutlined />}/>
        </Col>
        <Col className="gutter-row" flex='1' > 
        <Statistic title="Emails Sent" value={props.ClientsStore.emailsSend} style={style} prefix={<MailOutlined />}/>
        </Col>
        <Col className="gutter-row"  flex='1' >
        <Statistic title="Outstanding Clients" value={props.ClientsStore.outstandingClients} style={style} prefix={<UsergroupAddOutlined />} />
        </Col>
        <Col className="gutter-row"  flex='1' >
        <Statistic title="Hottest Country" value={props.ClientsStore.hottestCountry} style={style} prefix={<GlobalOutlined />} /> 
        </Col>
      </Row>
    );
  })
);

export default MainData;
