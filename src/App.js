import React, {useEffect} from "react";
import "./App.css";
import { observer, inject } from "mobx-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Actions from "./components/Actions/Actions";
import Analytics from "./components/Dashboard/Analytics";
import Clients from "./components/Clients/Clients";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = inject("ClientsStore")(
  observer(props => {
    useEffect(() => {
      props.ClientsStore.getClientsFromDB();
    }, []);

    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact render={() => <Home />} />
          <Route path="/clients" exact render={() => <Clients />} />
          <Route path="/actions" exact render={() => <Actions />} />
          <Route path="/analytics" exact render={() => <Analytics />} />
        </div>
      </Router>
    );
  })
);

export default App;
