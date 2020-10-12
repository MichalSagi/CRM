import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { PieChart, Pie, Cell } from "recharts";
import "../../App.css";

const ClientsAcquisition = inject("ClientsStore")(
  observer(props => {
    const data = props.ClientsStore.firstContactList.filter(d => d.name !== "0");

    useEffect(() => {
      props.ClientsStore.getFirstContactCount();
    }, []);
    const COLORS = ["#5D90B1", "#F6AE2D", "#937B43", "#33658A"];

    return (
      <div id="pie">
        <PieChart width={510} height={200} marginLeft={200}>
          <Pie
            data={data}
            cx={"40%"}
            cy={"60%"}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            fill="#F6AE2D"
            paddingAngle={3}
            labelLine={false}
            label={entry => `${entry.name}: ${entry.value}`}
          >
            {data.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} key={index} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  })
);
export default ClientsAcquisition;
