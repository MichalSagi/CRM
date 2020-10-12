import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import "antd/dist/antd.css";
import { Input, Select, AutoComplete } from "antd";

const FilterClients = inject("ClientsStore")(
  observer(props => {
    const { Option } = Select;
    const [filterValue, setFilterValue] = useState("");

    const handleSearch = value => {
      props.ClientsStore.filteredClientsList(value, filterValue);
    };

    const resetClients = () => {
      props.ClientsStore.getClientsFromDB();
    };

    return (
      <div className="site-input-group-wrapper">
        <Input.Group compact style={{ display: "flex", margin: 10, outline: "none" }}>
          <Select
            defaultValue="Select"
            style={{ width: "25%", marginLeft: 10, position: "flex-start" }}
            bordered={false}
            onSelect={setFilterValue}
            onChange={resetClients}
          >
            <Option value="c_name">Name</Option>
            <Option value="country">Country</Option>
            <Option value="o_name">Owner</Option>
            <Option value="e_type">Email</Option>
            <Option value="sold">Sold</Option>
          </Select>
          <AutoComplete style={{ width: "25%" }} placeholder="Search" bordered={false} onChange={handleSearch} />
        </Input.Group>
      </div>
    );
  })
);

export default FilterClients;
