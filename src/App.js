import React, {Component} from "react";
import "./App.css";
import { observer } from "mobx-react";

@observer
class App extends Component {
  render() {
    return <div className="App">Hello</div>;
  }
}

export default App;
