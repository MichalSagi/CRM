import React from "react";
import { observer, inject } from "mobx-react";
import FormActionAdd from "./FormActionAdd";
import FormActionUpdata from "./FormActionUpdate";

const Actions = inject("ClientsStore")(
  observer( () => {

    return (
      <div className="actions">
      <div>
          <h4>Add Client</h4>
      <FormActionAdd />
      </div>
      <h4>Update Client</h4>
       <FormActionUpdata />
      </div>
    );
  })
);

export default Actions;
