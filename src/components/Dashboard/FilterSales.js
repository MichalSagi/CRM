import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import "antd/dist/antd.css";
import { Input, Select, AutoComplete } from "antd";

const FilterSales = inject("ClientsStore")(
  observer(props => {
    const { Option } = Select;

    useEffect(() => {
      props.ClientsStore.filteredSales("country");
    }, []);

    const handleSelect = value => {
      props.ClientsStore.filteredSales(value);
    };

    const resetClients = () => {
      props.ClientsStore.getClientsFromDB();
    };

    return (
        <Select
          defaultValue="country"
          style={{ width: "37%", position: "flex-start" }}
          bordered={false}
          onSelect={handleSelect}
          onChange={resetClients}
        >
          <Option value="o_name">Owner</Option>
          <Option value="e_type">Email</Option>
          <Option value="first_contact">Month</Option>
          <Option value="country">Country</Option>
        </Select>
    );
  })
);

export default FilterSales;
