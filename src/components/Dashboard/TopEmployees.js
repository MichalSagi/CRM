import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { BarChart, Bar, XAxis, YAxis, LabelList } from "recharts";

const TopEmployees = inject("ClientsStore")(
  observer(props => {
    const data = props.ClientsStore.topOwners;
    useEffect(() => {
      props.ClientsStore.getTopOwners();
    }, []);

    return (
      <BarChart width={350} height={200} data={data} margin={{ top: 10, right: 40, left: 40, bottom: 10 }} layout="vertical" barSize={25}>
        <XAxis type="number" />
        <YAxis dataKey="o_name" type="category" />
        <Bar fill="#2F4858" dataKey="Sales">
          <LabelList dataKey="Sales" position="right" />
        </Bar>
      </BarChart>
    );
  })
);
export default TopEmployees;
