import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip } from "recharts";
import FilterSales from "./FilterSales";

const SalesCategories = inject("ClientsStore")(
  observer(props => {
    const data = props.ClientsStore.salesDate;
    useEffect(() => {
      props.ClientsStore.filteredSales('country');
    }, []);

    return (
      <>
        <FilterSales />
        <BarChart width={650} height={250} data={data} margin={{ top: 10, right: 40, left: 40, bottom: 10 }} barSize={20} fontWeight={400}>
          <XAxis dataKey="name" type="category"/>
          <YAxis  type="number"/>
          <Bar fill="#2F4858" dataKey="value">
            <LabelList dataKey="value" position="top" />
          </Bar>
          <Tooltip cursor={{fill: 'transparent'}} />
        </BarChart>
      </>
    );
  })
);
export default SalesCategories;
