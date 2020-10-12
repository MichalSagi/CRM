import React from "react";
import { observer, inject } from "mobx-react";
import TableTemplaite from "./TableTamplate";
import FilterClients from "./FilterClients";

const Clients = inject("ClientsStore")(
  observer(props => {
    return (
      <div className="Clients">
        <FilterClients />
        <TableTemplaite />
      </div>
    );
  })
);

export default Clients;
