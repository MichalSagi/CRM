import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import "../../App.css";

const ClientsByMonth = inject("ClientsStore")(
  observer(props => {
    const data = props.ClientsStore.firstContactByMonths;

    useEffect(() => {
      props.ClientsStore.getFirstContactByMonths();
    }, []);

    return (
      <LineChart width={544} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" tickCount={20}/>
        <YAxis />
        <Tooltip cursor={{fill: 'transparent'}}/>
        <Line type='linear' dataKey="value" stroke="#F26419" />
      </LineChart>
    );
  })
);
export default ClientsByMonth;
