import React from "react";
import "./App.css";
import Routes from "./routes";
import { HashRouter } from "react-router-dom";
import AppNavigation from "./components/AppNavigation/AppNavigation";

function App() {
  return (
    <HashRouter>
      <div className="App">{Routes}</div>
    </HashRouter>
  );
}

export default App;
